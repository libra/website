---
id: move-overview
title: Move Overview
---

## Overview

Move is a new programming language developed to provide a safe and programmable foundation for the Libra Blockchain. An account in the Libra Blockchain is a container for an arbitrary number of Move modules and Move resources. Every transaction submitted to the Libra Blockchain uses a transaction script written in Move to encode its logic. The transaction script can call and interact with procedures and resources defined in other Move modules to update the global state of the blockchain.

In the first part of this guide, we will provide a high-level introduction to the key features of the Move language:

1. [Move Transaction Scripts Enable Programmable Transactions](##move-transaction-scripts-enable-programmable-transactions)
2. [Move Modules Allow Composable Smart Contracts](#move-modules-allow-composable-smart-contracts)
3. [Move Has First Class Resources](#move-has-first-class-resources)

For the curious reader, the [Move technical paper](papers/the-move-language) contains much more detail about the language.

In the second part of this guide, we'll lift up the hood and show you how to write your own Move programs in [Move Intermediate Representation](#move-intermediate-representation). Custom Move programs are not supported in the initial testnet release, but these features are available locally for you to try out.

## Key Features of Move

### Move Transaction Scripts Enable Programmable Transactions

* Each Libra transaction includes a **Move transaction script** which encodes the logic a validator should perform on the client's behalf (for example, move Libra from user A to user B). 
* The transaction script interacts with [Move resources](#move-has-first-class-resources) published in the global storage of the Libra Blockchain by calling the procedures of one or more [Move modules](#move-modules-allow-composable-smart-contracts). 
* A transaction script <u>is not</u> stored in the global state, and it cannot be invoked by other transaction scripts. It is a <u>single-use program</u>.
* We present several examples of transaction scripts in [Writing Transaction Scripts](#writing-transaction-scripts)

### Move Modules Allow Composable Smart Contracts

Move modules define the rules for updating the global state of the Libra Blockchain. Modules fill the same niche as “smart contracts” in other blockchain systems. Modules declare[resource](#move-has-first-class-resources) types that can be published under user accounts. Each account in the Libra Blockchain is a container for an arbitrary number of resources and modules.

* A module declares both struct types (including resources) and procedures.
* The procedures of a Move module define rules for creating, accessing, and destroying the types it declares.
* Modules are reusable. A struct type declared in one module can use struct types declared in another module, and a procedure declared in one module can invoke public procedures declared in another module. A module can invoke procedures declared in other Move modules. Transaction scripts can invoke any public procedure of a published module.
* In the long term, any Libra user will be able to publish (and maintain) Move modules. A Libra user can publish modules under their own account. 

### Move Has First Class Resources

* The key feature of Move is the ability to define **custom resource types**. Resource types are used to encode programmable assets.
* A Move resource is a struct that binds named fields to simple values such as integers, or complex values such as other resources. 
* Resources are ordinary values in the language, they can be stored as data structures, passed as arguments to procedures, returned from procedures, and so on. 
* The <u>Move type system provides special safety guarantees</u> for resources. Move resources can never be copied, reused, or discarded. A resource type can only be created or destroyed by the module that defines the type. These guarantees are enforced statically by the [Move Virtual Machine](glossary#move-virtual-machine) via bytecode verification. The virtual machine will refuse to run code that might violate these guarantees.
* Resource safety is powerful enough that the **Libra** currency itself is implemented as a normal resource type with no special status in the language.  

## Move: Under the Hood

### Move Intermediate Representation

This section describes how to write [transaction scripts](#writing-transaction-scripts) and [modules](#writing-modules) in the Move intermediate representation (IR). Move IR is high-level enough to write human-readable code, yet low-level enough to have a direct translation to Move bytecode. We caution the reader that the IR is an early (and unstable) precursor to a forthcoming Move source language (more details in [Future Developer Experience](#future-developer-experience)), and is not particularly developer-friendly. It is too early to build real products on top of Move! Nevertheless, we are excited about the Move language and hope that developers will give it a try despite the rough edges. 

We will proceed by presenting snippets of heavily-commented Move IR. We encourage readers to follow along with the examples by compiling, running, and modifying them locally. The README files under `libra/language/README.md` and `libra/language/ir_to_bytecode/README.md` will explain how to do this.

### Writing Transaction scripts

As we explained in [Move Transaction Scripts Enable Programmable Transactions](#move-transaction-scripts-enable-programmable-transactions), users write transaction scripts to request updates to the global storage of the Libra Blockchain. There are two important building blocks that will appear in almost any transaction script: the `LibraAccount.T` and `LibraCoin.T` resource types. `LibraAccount` is the name of the module, and `T` is the name of a resource declared by that module. This is a common naming convention in Move; the “main” type declared by a module is typically named `T`. 

When we says that a user “has an account at address `0xff`” on the Libra blockchain, what we actually mean is that the address `0xff` holds an instance of the `LibraAccount.T` resource. Every nonempty address has a `LibraAccount.T` resource. This resource stores account data such as the sequence number, authentication key, and balance. Any part of the Libra system that wants to interact with an account must do so by reading data from the `LibraAccount.T` resource or invoking procedures of the `LibraAccount` module.

The account balance is a resource of type `LibraCoin.T`. As you might have expected, this is the type of a Libra coin. As we explained in [Move Has First Class Resources](#move-has-first-class-resources), this type is a first-class citizen in the Move language. Resources of type `LibraCoin.T` can be stored in program variables, passed between procedures, and so on, just like any other value.

The interested reader can find the Move IR definitions of these two key resources in the `LibraAccount` and `LibraCoin` modules under the `libra/language/stdlib/modules/` directory of Libra Core.

Now, let us see how a programmer can interact with these modules and resources in a transaction script.

```rust
// Simple peer-peer payment example.

// Use LibraAccount module published on the blockchain at account address
// 0x0...0 (with 64 zeroes). 0x0 is shorthand that the IR pads out to 256 bits (64
// digits) by adding leading zeroes.
import 0x0.LibraAccount;
main(payee: address, amount: u64) {
  // Declare a local variable. For now, the compiler will infer the type. In 
  // the future, the IR will require explicit type annotations.
  let coin; // type: 0x0.LibraCoin.T
  
  // Acquire a 0x0.LibraCoin.T resource with value `amount` from the sender's account
  // This will fail if the sender's balance is less than `amount`.
  coin = LibraAccount.withdraw_from_sender(move(amount));
  // Move the LibraCoin.T resource into the account of `payee`. If there is no
  // account at the address `payee`, this step will fail
  LibraAccount.deposit(move(payee), move(coin));   
  return;
}
```

This transaction script has an unfortunate problem, it will fail if the there is no account under the address `payee`. We will fix this problem by modifying the script to create an account for `payee` if one does not already exist.

```rust
// A small variant of the peer-peer payment example that creates a fresh account if
// one does not already exist.

import 0x0.LibraAccount;
main(payee: address, amount: u64) {
  let coin; // type: 0x0.LibraCoin.T
  let account_exists; // type: bool
  
  // Acquire a 0x0.LibraCoin.T resource with value `amount` from the sender's account
  // This will fail if the sender's balance is less than `amount`.
  coin = LibraAccount.withdraw_from_sender(move(amount));

  account_exists = Account.exists(copy(payee));
  
  if (!move(account_exists)) {
    // Creates a fresh account at address payee by publishing a LibraAccount.T
    // resource under this address. If theres is already a LibraAccount.T resource
    // under the address, this will fail.
    create_account(copy(payee));
  }
  
  LibraAccount.deposit(move(payee), move(coin));   
  return;
}
```

Let us look at a more complex example. In this example, we will use a transaction script to pay multiple recipients instead of just one.

```rust
// Multiple payee example. This is written in a slightly verbose way to emphasize
// the ability to split a LibraCoin.T resource. The simpler way would be to use
// multiple calls to LibraAccount.withdraw_from_sender.

import 0x0.LibraAccount;
import 0x0.LibraCoin;
main(payee1: address, amount1: u64, payee2: address, amount2: u64) {
  let coin1; // type: 0x0.LibraCoin.T
  let coin2; // type: 0x0.LibraCoin.T
  let total; // type: u64
  
  total = move(amount1) + copy(amount2);
  coin1 = LibraAccount.withdraw_from_sender(move(total));
  // This mutates `coin1`, which now has value `amount1`
  coin2 = LibraCoin.withdraw(move(amount2));

  // Perform the payments
  LibraAccount.deposit(move(payee1), move(coin1));
  LibraAccount.deposit(move(payee2), move(coin2));    
  return;
}
```

This concludes our tour of transaction scripts. For more examples, including the transaction scripts supported in the initial testnet, check out  `libra/language/stdlib/transaction_scripts`.

### Writing modules

We will now turn our attention to writing our own Move modules instead of just reusing the existing `LibraAccount` and `LibraCoin` modules. This section explains each component of a module in detail. Readers who would prefer a more example-based introduction to modules might prefer to start by looking at the module code under `libra/language/stdlib/modules`.

```rust
module MyModule {  
  // Like transaction scripts, Move module declarations can import modules
  // published elsewhere on the blockchain. Importing an external module allows 
  // the current module to use type declarations and public procedures declared
  // in the other module.
  import 0x0.LibraCoin;

  // (1) Resource and struct type declarations

  // The first part of a Move module is type declarations. A module can declare
  // two different forms of types: *resources* and *structs*.
  // Move resources are a special sort of C-style record. Resource fields can hold
  // either primitive values...
  resource ResourceExample { f: u64, b: bool, a: address, arr: bytearray }
  // ... or nested resources. Nested resource types can be declared either in the
  // current module (like R#Self.ResourceExample) or in a separate module
  // (like R#LibraCoin.T). The R# and V# bits are *kind annotations*
  // (shorthand for "Resource" and "unrestricted Value") that must match the kind
  // of the declared type. For example...
  resource ResourceWrapper { r: R#Self.ResourceExample, c: R#LibraCoin.T }
  // ... the bytecode verifier would reject the following code because the
  // ResourceExample type is incorrectly annotated with the kind V.
  // resource BadResourceWrapper { r: V#Self.ResourceExample }

  // In addition to resources, Move has structs. Like resources, struct fields can
  // contain both primitive values and nested structs...
  // Move has C-style structs that can contain both primitive values... 
  struct StructExample1 { f: u64 }
  struct StructExample2 { s: V#Self.StructExample1, b: bool }
  // .. but not nested resources. The following code would be rejected by the 
  // byecode verifier. The reason why Move imposes this restriction will become
  // clear shortly (see (3)).
  // struct BadStructWrapper { r: R#Self.ResourceExample }
      
  // (2) Procedure declarations
  
  // The second part of a Move module is procedure declarations. Procedures
  // can use types and invoke procedures both in other modules...  
  public return_coin(coin: R#LibraCoin.T): R#LibraCoin.T {
    let coin_value; // type: u64
    
    coin_value = LibraCoin.value(&coin);
    return move(coin);
  }

  // ... and the same module. Procedures without a `public` modifier are *internal*
  // and can only be invoked from inside their declaring module. Trying to invoke 
  // an internal procedure from an external module will fail at bytecode 
  // verification time.
  internal_procedure(coin: R#LibraCoin.T): R#LibraCoin.T {
    let return_value; // type: R#LibraCoin.T

    return_value = Self.return_coin(move(coin));
    return move(return_value);
  }

  // TODO: (3) Moving vs copying structs, resources, and primitive types

  // TODO: (4) Module builtins
   
}
```

### Future Developer experience

In the near future, the IR will stabilize and compiling and verifying programs will become more user-friendly. Additionally, location information from the IR source will be tracked and passed to the verifier to make error messages easier to debug. However, the IR will continue to remain a tool for testing Move bytecode. It is meant to be a semantically transparent representation of the underlying bytecode. To allow effective tests, the IR compiler must produce bad code that will be rejected by the bytecode verifier or fail at runtime in the compiler. A user-friendly source language would make different choices; it should refuse to compile code that will fail at a subsequent step in the pipeline.

In the future, we will have a higher-level Move source language. This language will be designed to provide a modern and expressive ecosystem that allows common idioms and programming patterns to be represented easily. Since Move bytecode is a new language and the blockchain is a new programming environment, our understanding of the idioms and patterns we should support is still evolving. The source language is in the early stages of development and we do not have a timetable for its release yet.
