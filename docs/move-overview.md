---
id: move-overview
title: Getting Started With Move
---

Move is a new programming language developed to provide a safe and programmable foundation for the Libra Blockchain. An account in the Libra Blockchain is a container for an arbitrary number of Move resources and Move modules. Every transaction submitted to the Libra Blockchain uses a transaction script written in Move to encode its logic. The transaction script can call procedures declared by a module to update the global state of the blockchain.

In the first part of this guide, we will provide a high-level introduction to the key features of the Move language:

1. [Move Transaction Scripts Enable Programmable Transactions](#move-transaction-scripts-enable-programmable-transactions)
2. [Move Modules Allow Composable Smart Contracts](#move-modules-allow-composable-smart-contracts)
3. [Move Has First Class Resources](#move-has-first-class-resources)

For the curious reader, the [Move technical paper](move-paper.md) contains much more detail about the language.

In the second part of this guide, we will “look under the hood” and show you how to write your own Move programs in the [Move intermediate representation](#move-intermediate-representation). Custom Move programs are not supported in the initial testnet release, but these features are available for you to try out locally.

## Key Features of Move

### Move Transaction Scripts Enable Programmable Transactions

* Each Libra transaction includes a **Move transaction script** that encodes the logic a validator should perform on the client's behalf (for example, to move Libra from Alice's account to Bob's account). 
* The transaction script interacts with [Move resources](#move-has-first-class-resources) published in the global storage of the Libra Blockchain by calling the procedures of one or more [Move modules](#move-modules-allow-composable-smart-contracts). 
* A transaction script is not stored in the global state, and it cannot be invoked by other transaction scripts. It is a single-use program.
* We present several examples of transaction scripts in [Writing Transaction Scripts](#writing-transaction-scripts).

### Move Modules Allow Composable Smart Contracts

Move modules define the rules for updating the global state of the Libra Blockchain. Modules fill the same niche as smart contracts in other blockchain systems. Modules declare [resource](#move-has-first-class-resources) types that can be published under user accounts. Each account in the Libra Blockchain is a container for an arbitrary number of resources and modules.

* A module declares both struct types (including resources, which are a special kind of struct) and procedures.
* The procedures of a Move module define the rules for creating, accessing, and destroying the types it declares.
* Modules are reusable. A struct type declared in one module can use struct types declared in another module, and a procedure declared in one module can invoke public procedures declared in another module. A module can invoke procedures declared in other Move modules. Transaction scripts can invoke any public procedure of a published module.
* Eventually, Libra users will be able to publish modules under their own accounts.

### Move Has First Class Resources

* The key feature of Move is the ability to define custom resource types. Resource types are used to encode safe digital assets with rich programmability.
* Resources are ordinary values in the language. They can be stored as data structures, passed as arguments to procedures, returned from procedures, and so on. 
* The Move type system provides special safety guarantees for resources. Move resources can never be duplicated, reused, or discarded. A resource type can only be created or destroyed by the module that defines the type. These guarantees are enforced statically by the [Move virtual machine](reference/glossary.md#move-virtual-machine-mvm) via bytecode verification. The Move virtual machine will refuse to run code that has not passed through the bytecode verifier.
* The Libra currency is implemented as a resource type named `LibraCoin.T`. `LibraCoin.T` has no special status in the language; every Move resource enjoys the same protections.

## Move: Under the Hood

### Move Intermediate Representation

This section describes how to write [transaction scripts](#writing-transaction-scripts) and [modules](#writing-modules) in the Move intermediate representation (IR). We caution the reader that the IR is an early (and unstable) precursor to a forthcoming Move source language (see [Future Developer Experience](#future-developer-experience) for more details). Move IR is a thin syntactic layer over Move bytecode that is used to test the bytecode verifier and virtual machine, and it is not particularly developer-friendly. It is high level enough to write human-readable code, yet low level enough to compile directly to Move bytecode. Nevertheless, we are excited about the Move language and hope that developers will give the IR a try, despite the rough edges. 

We will proceed by presenting snippets of heavily-commented Move IR. We encourage readers to follow along with the examples by compiling, running, and modifying them locally. The README files `libra/language/README.md` and `libra/language/compiler/README.md` explain how to do this.

### Writing Transaction Scripts

As we explained in [Move Transaction Scripts Enable Programmable Transactions](#move-transaction-scripts-enable-programmable-transactions), users write transaction scripts to request updates to the global storage of the Libra Blockchain. There are two important building blocks that will appear in almost any transaction script: the `LibraAccount.T` and `LibraCoin.T` resource types. `LibraAccount` is the name of the module, and `T` is the name of a resource declared by that module. This is a common naming convention in Move; the “main” type declared by a module is typically named `T`. 

When we say that a user "has an account at address `0xff` on the Libra Blockchain", what we mean is that the address `0xff` holds an instance of the `LibraAccount.T` resource. Every nonempty address has a `LibraAccount.T` resource. This resource stores account data, such as the sequence number, authentication key, and balance. Any part of the Libra system that wants to interact with an account must do so by reading data from the `LibraAccount.T` resource or invoking procedures of the `LibraAccount` module.

The account balance is a resource of type `LibraCoin.T`. As we explained in [Move Has First Class Resources](#move-has-first-class-resources), this is the type of a Libra coin. This type is a "first-class citizen" in the language just like any other Move resource. Resources of type `LibraCoin.T` can be stored in program variables, passed between procedures, and so on.

We encourage the interested reader to examine the Move IR definitions of these two key resources in the `LibraAccount` and `LibraCoin` modules under the `libra/language/stdlib/modules/` directory.

Now let us see how a programmer can interact with these modules and resources in a transaction script.

```move
// Simple peer-peer payment example.

// Use LibraAccount module published on the blockchain at account address
// 0x0...0 (with 64 zeroes). 0x0 is shorthand that the IR pads out to
// 256 bits (64 digits) by adding leading zeroes.
import 0x0.LibraAccount;
import 0x0.LibraCoin;
main(payee: address, amount: u64) {
  // The bytecode (and consequently, the IR) has typed locals.  The scope of
  // each local is the entire procedure. All local variable declarations must
  // be at the beginning of the procedure. Declaration and initialization of
  // variables are separate operations, but the bytecode verifier will prevent
  // any attempt to use an uninitialized variable.
  let coin: LibraCoin.T;
  
  // Acquire a LibraCoin.T resource with value `amount` from the sender's
  // account.  This will fail if the sender's balance is less than `amount`.
  coin = LibraAccount.withdraw_from_sender(move(amount));
  // Move the LibraCoin.T resource into the account of `payee`. If there is no
  // account at the address `payee`, this step will fail
  LibraAccount.deposit(move(payee), move(coin));

  // Every procedure must end in a `return`. The IR compiler is very literal:
  // it directly translates the source it is given. It will not do fancy
  // things like inserting missing `return`s.
  return;
}
```

This transaction script has an unfortunate problem &mdash; it will fail if there is no account under the address `payee`. We will fix this problem by modifying the script to create an account for the `payee` if one does not already exist.

```move
// A small variant of the peer-peer payment example that creates a fresh
// account if one does not already exist.

import 0x0.LibraAccount;
import 0x0.LibraCoin;
main(payee: address, amount: u64) {
  let coin: LibraCoin.T;
  let account_exists: bool;

  // Acquire a LibraCoin.T resource with value `amount` from the sender's
  // account.  This will fail if the sender's balance is less than `amount`.
  coin = LibraAccount.withdraw_from_sender(move(amount));

  account_exists = LibraAccount.exists(copy(payee));

  if (!move(account_exists)) {
    // Creates a fresh account at the address `payee` by publishing a
    // LibraAccount.T resource under this address. If theres is already a
    // LibraAccount.T resource under the address, this will fail.
    create_account(copy(payee));
  }

  LibraAccount.deposit(move(payee), move(coin));
  return;
}
```

Let us look at a more complex example. In this example, we will use a transaction script to pay multiple recipients instead of just one.

```move
// Multiple payee example. This is written in a slightly verbose way to
// emphasize the ability to split a `LibraCoin.T` resource. The more concise
// way would be to use multiple calls to `LibraAccount.withdraw_from_sender`.

import 0x0.LibraAccount;
import 0x0.LibraCoin;
main(payee1: address, amount1: u64, payee2: address, amount2: u64) {
  let coin1: LibraCoin.T;
  let coin2: LibraCoin.T;
  let total: u64;

  total = move(amount1) + copy(amount2);
  coin1 = LibraAccount.withdraw_from_sender(move(total));
  // This mutates `coin1`, which now has value `amount1`.
  // `coin2` has value `amount2`.
  coin2 = LibraCoin.withdraw(&mut coin1, move(amount2));

  // Perform the payments
  LibraAccount.deposit(move(payee1), move(coin1));
  LibraAccount.deposit(move(payee2), move(coin2));
  return;
}
```

This concludes our "tour" of transaction scripts. For more examples, including the transaction scripts supported in the initial testnet, refer to `libra/language/stdlib/transaction_scripts`.

### Writing Modules

We will now turn our attention to writing our own Move modules instead of just reusing the existing `LibraAccount` and `LibraCoin` modules. Consider this situation:
Bob is going to create an account at address *a* at some point in the future. Alice wants to "earmark" some funds for Bob so that he can pull them into his account once it is created. But she also wants to be able to reclaim the funds for herself if Bob never creates the account.

To solve this problem for Alice, we will write a module `EarmarkedLibraCoin` which:
* Declares a new resource type `EarmarkedLibraCoin.T` that wraps a Libra coin and recipient address.
* Allows Alice to create such a type and publish it under her account (the `create` procedure).
* Allows Bob to claim the resource (the `claim_for_recipient` procedure).
* Allows anyone with an `EarmarkedLibraCoin.T` to destroy it and acquire the underlying coin (the `unwrap` procedure).

```move
// A module for earmarking a coin for a specific recipient
module EarmarkedLibraCoin {
  import 0x0.LibraCoin;

  // A wrapper containing a Libra coin and the address of the recipient the
  // coin is earmarked for.
  resource T {
    coin: LibraCoin.T,
    recipient: address
  }

  // Create a new earmarked coin with the given `recipient`.
  // Publish the coin under the transaction sender's account address.
  public create(coin: LibraCoin.T, recipient: address) {
    let t: Self.T;

    // Construct or "pack" a new resource of type T. Only procedures of the
    // `EarmarkedLibraCoin` module can create an `EarmarkedLibraCoin.T`.
    t = T {
      coin: move(coin),
      recipient: move(recipient),
    };

    // Publish the earmarked coin under the transaction sender's account
    // address. Each account can contain at most one resource of a given type;
    // this call will fail if the sender already has a resource of this type.
    move_to_sender<T>(move(t));
    return;
  }

  // Allow the transaction sender to claim a coin that was earmarked for her.
  public claim_for_recipient(earmarked_coin_address: address): Self.T acquires T {
    let t: Self.T;
    let t_ref: &Self.T;
    let sender: address;

    // Remove the earmarked coin resource published under `earmarked_coin_address`.
    // If there is no resource of type T published under the address, this will fail.
    t = move_from<T>(move(earmarked_coin_address));

    t_ref = &t;
    // This is a builtin that returns the address of the transaction sender.
    sender = get_txn_sender();
    // Ensure that the transaction sender is the recipient. If this assertion
    // fails, the transaction will fail and none of its effects (e.g.,
    // removing the earmarked coin) will be committed.  99 is an error code
    // that will be emitted in the transaction output if the assertion fails.
    assert(*(&move(t_ref).recipient) == move(sender), 99);

    return move(t);
  }

  // Allow the creator of the earmarked coin to reclaim it.
  public claim_for_creator(): Self.T acquires T {
    let t: Self.T;
    let sender: address;

    sender = get_txn_sender();
    // This will fail if no resource of type T under the sender's address.
    t = move_from<T>(move(sender));
    return move(t);
  }

  // Extract the Libra coin from its wrapper and return it to the caller.
  public unwrap(t: Self.T): LibraCoin.T {
    let coin: LibraCoin.T;
    let recipient: address;

    // This "unpacks" a resource type by destroying the outer resource, but
    // returning its contents. Only the module that declares a resource type
    // can unpack it.
    T { coin, recipient } = move(t);
    return move(coin);
  }

}
```

Alice can create an earmarked coin for Bob by creating a transaction script that invokes `create` on Bob's address *a* and a `LibraCoin.T` that she owns. Once *a* has been created, Bob can claim the coin by sending a transaction from *a*. This invokes `claim_for_recipient`, passes the result to `unwrap`, and stores the returned `LibraCoin` wherever he wishes. If Bob takes too long to create an account under *a* and Alice wants to reclaim her funds, she can do so by using `claim_for_creator` followed by `unwrap`.

The observant reader may have noticed that the code in this module is agnostic to the internal structure of `LibraCoin.T`. It could just as easily be written using generic programming (e.g., `resource T<AnyResource: R> { coin: AnyResource, ... }`). We are currently working on adding support for exactly this sort of parametric polymorphism to Move.

### Future Developer Experience

In the near future, the IR will stabilize, and compiling and verifying programs will become more user-friendly. Additionally, location information from the IR source will be tracked and passed to the verifier to make error messages easier to debug. However, the IR will continue to remain a tool for testing Move bytecode. It is meant to be a semantically transparent representation of the underlying bytecode. To allow effective tests, the IR compiler must produce bad code that will be rejected by the bytecode verifier or fail at runtime in the compiler. A user-friendly source language would make different choices; it should refuse to compile code that will fail at a subsequent step in the pipeline.

In the future, we will have a higher-level Move source language. This source language will be designed to express common Move idioms and programming patterns safely and easily. Since Move bytecode is a new language and the Libra Blockchain is a new programming environment, our understanding of the idioms and patterns we should support is still evolving. The source language is in the early stages of development, and we do not have a timetable for its release yet.
