---
id: move-language
title: Move Language
custom_edit_url: https://github.com/libra/libra/edit/master/language/README.md
---

Move is a new programming language developed to provide a safe and
programmable foundation for the Libra Blockchain.

## Overview

The Move language component consists of two main parts:

* The Move [compiler](https://github.com/libra/libra/tree/master/language/compiler) translates programs written
   in the Move intermediate representation to Move bytecode format.
* The Move [virtual machine](https://github.com/libra/libra/tree/master/language/vm)(VM) which:
   * Defines the bytecode format.
   * Defines the genesis state for the Libra blockchain.
   * Contains a bytecode verifier that performs static structural and
     semantic verification of the bytecode format.
   * Implements a bytecode interpreter for the bytecode format.

Each of these components have their own READMEs which explore the
technical aspects of the
[IR to bytecode compiler](https://github.com/libra/libra/tree/master/language/compiler) and
[virtual machine](https://github.com/libra/libra/tree/master/language/vm) respectively.

The language component interacts with the other components in Libra only through
the VM---in particular through the bytecode interpreter and
blockchain genesis state definitions. Specifically, the language component
interacts with the following other Libra Core components:

* The [client](https://github.com/libra/libra/tree/master/client) component
  which uses the transaction types generated in the genesis state to encode
  various transactions such as minting and peer-to-peer transfers.
* The [configuration](https://github.com/libra/libra/tree/master/config)
  component which uses the genesis state to initialize and configure validator
  nodes.
* The [execution](https://github.com/libra/libra/tree/master/execution)
  component which uses the VM runtime to execute blocks of transactions.
* The [VM validation](https://github.com/libra/libra/tree/master/vm_validator)
  component which uses the VM runtime to perform validation checks on the
  sending account in [admission control](https://github.com/libra/libra/tree/master/admission_control).

Let's follow these dependencies throughout the life of a transaction.
First, a client crafts a transaction using a transaction defined in the
genesis state. When a validator receives this transaction it validates it
using the admission control component. The admission control component
validates the transaction using the VM validation component, which in-turn uses the VM
to perform checks against the sending account and submitted transaction.
Later on in the transaction's life when it has been placed in a block to be
executed, consensus will use the execution component and thence the VM to
execute this block of transactions.

### Exploring and Running Move IR Programs

* You can find various examples of the Move IR in the various
  [IR compiler tests](https://github.com/libra/libra/tree/master/language/functional_tests/tests).
* You can also find some more interesting examples of programs written in the
  Move IR by looking at the `.mvir` files for the core Libra modules
  [here](https://github.com/libra/libra/tree/master/language/stdlib/modules).
  The two most notable ones being
  [LibraAccount.mvir](https://github.com/libra/libra/blob/master/language/stdlib/modules/libra_account.mvir)
  and
  [LibraCoin.mvir](https://github.com/libra/libra/blob/master/language/stdlib/modules/libra_coin.mvir).
* You can also look at the various transaction scripts that we have that that are written in
  the Move IR. These are:
   [account creation](https://github.com/libra/libra/blob/master/language/stdlib/transaction_scripts/create_account.mvir);
   [minting of money](https://github.com/libra/libra/blob/master/language/stdlib/transaction_scripts/mint.mvir);
   [peer to peer transfers](https://github.com/libra/libra/blob/master/language/stdlib/transaction_scripts/peer_to_peer_transfer.mvir); and
   [authentication key rotation](https://github.com/libra/libra/blob/master/language/stdlib/transaction_scripts/rotate_authentication_key.mvir).
* An informal grammar for the Move IR grammar is defined in the documentation
  comments at the top of [this file](https://github.com/libra/libra/blob/master/language/compiler/src/parser/mod.rs).
  Understanding the Move IR grammar will be helpful before any development begins.
  However, there may be some deviations from the informal grammar in the
  parsed syntax. If you do windup having issues, you can take a look at the actual
  grammar as described in the [parser for the Move IR](https://github.com/libra/libra/blob/master/language/compiler/src/parser/syntax.lalrpop).
* For instructions on how to compile and verify Move IR programs, see the
  instructions in the [IR compiler README](https://github.com/libra/libra/blob/master/language/compiler/README.md).

## Implementation Details: An Overview

We provide a brief technical overview of the system as a whole here. More detailed
technical information on each of the components can be found in the READMEs for the
[virtual machine](https://github.com/libra/libra/blob/master/language/vm/README.md) and [IR compiler](https://github.com/libra/libra/blob/master/language/compiler/README.md) respectively.

1. **The Move IR Compiler**
    The programmer writes a source program---either a Move module, or a
    Move script---in the high-level Move IR. The Move IR compiler
    translates this into the Move bytecode format. For example, the
    programmer inputs this transaction script to the IR compiler:
    ```
    import 0x0.LibraAccount;
    main () {
      LibraAccount.pay_from_sender(0xDEADBEEF, 10);
      return;
    }
    ```
    which translates this to a sequence of bytecode instructions. These
    instruction sequences reside within a `CompiledScript` which provides
    additional contextual information needed by the bytecode
    interpreter---such as the other modules and functions that this script
    calls:
    ```
    CompiledScript: {
    Main:
            public 0x0.<SELF>.main(): ()
                    LdAddr(0xDEADBEEF)
                    LdConst(10)
                    Call(0x0.LibraAccount.pay_from_sender(Address, Integer))
                    Ret
    Module Handles: [
            0x0.<SELF>,
            0x0.LibraAccount,
    ]
    Function Handles: [
            0x0.<SELF>.main(): (),
            0x0.LibraAccount.pay_from_sender(Address, Integer): (),
    ]
      ...
    }
    ```
    You can read more about the compilation process and `CompiledScript`s
    in the [IR compiler README](https://github.com/libra/libra/tree/master/language/compiler).

2. **The Move Virtual Machine**
  Once the program has been compiled to the bytecode format, it is then
  verified statically by the bytecode verifier.

  The bytecode verifier performs a number of static checks on the resulting
  bytecode such as checking for illegal table indices, duplicate table entries,
  illegal type signatures, incorrect procedure arguments, dangling
  references to deallocated objects, and illegal copying of resources. More
  information on the verification of the bytecode format can be found in
  the [bytecode verifier README](https://github.com/libra/libra/blob/master/language/bytecode_verifier/README.md).

  The bytecode interpreter executes bytecode programs in the Move bytecode
  language. The result of an execution is a sequence of writes to locations
  of global memory---or a _write set_. This is the final output of the
  transaction from the VM. The [execution](https://github.com/libra/libra/tree/master/execution) component later
  applies this write set to the global blockchain state. You can read more
  about the interpreter in the [bytecode interpreter's README](https://github.com/libra/libra/blob/master/language/vm/vm_runtime/README.md).

### Module Organization
The language component has the following high-level directory structure:

```
├── README.md          # This README
├── bytecode_verifier  # The bytecode verifier
├── functional_tests   # Testing framework for the Move language
├── compiler     # The IR to Move bytecode compiler
├── stdlib             # Move standard modules, scripts, and native module definitions
├── test.sh            # Testing script for the language component
└── vm
    ├── cost_synthesis # Cost synthesis for bytecode instructions
    ├── src            # Bytecode language definitions. Some structural checks
    ├── tests          # VM tests
    ├── vm_genesis     # The genesis state creation, and blockchain genesis writeset
    └── vm_runtime     # The bytecode interpreter
```

