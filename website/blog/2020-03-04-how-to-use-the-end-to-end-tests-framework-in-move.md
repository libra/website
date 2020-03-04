---
author: Libra Engineering Team
title: How to use the end-to-end tests framework in Move
---

<script>
    let items = document.getElementsByClassName("post-meta");   
    for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].innerHTML = '<p class="post-meta">March 04, 2020</p>') items[i].innerHTML = '<p class="post-meta">March 04, 2020</p>';
    }
</script>

**Note**: The Move language is under development; the information and the terminology used in this document are subject to change.

## Overview

The framework we use to test the Move language is end-to-end (e2e) tests. The goal of e2e tests is to emulate the transition of on-chain states through execution of transactions. This post is an introduction to the design of e2e tests and includes a few examples to help you understand how to use the tests.

## Understanding the testing pipeline

<img alt="" src="/img/diagram_1_e2e_pipeline_simple.svg">

The e2e testing pipeline consists of the following components:

- **Test drive(s)**: discovers test files, extracts config options and directives from the text input, and sets up other components.
- **Client**: a minimal client that compiles and signs transactions.
- **Executor**: an emulated single-validator "network" that verifies and executes transactions. It **does** **not** run consensus protocols and uses a simple in-memory database for on-chain states.
- **Logger**: records the outputs and errors produced by the client and the executor.
- **Checker**: a utility that performs text pattern matching on the log to determine if the test has passed or failed. Inspired by LLVM FileCheck and the Rust filecheck crate, the Checker uses directives to define its patterns.

The e2e testing framework has several advantages over the conventional unit tests written in Rust:

- Tests can be done more efficiently because the framework handles the setup of the pipeline, which is fairly complicated.
- Move tests can be added to individual files, and the binary does not need to be recompiled at every change.
- There's support for keyword matching instead of the strict equality testing in Rust. This is usually more flexible and robust. Changes in the Rust code are less likely to affect the result of a test unless they alter certain behaviors we care about in a meaningful way.

The e2e testing framework is easier to use compared with using a Libra client for testing Move transactions, as it does not require setting up access to the Libra testnet or a local validator network.

## Writing e2e tests

Currently, we support tests written in either the Move source language or the Move IR.

- **Move source language tests**
  - Located at `Libra/language/move-lang/tests/functional`.
  - Each file with the extension `.move` is considered a test and can include one or more transactions.
  - Command to run the tests: `cargo test -p`**`move-lang`**`functional_testsuite`.
- **IR tests**
  - Located at `libra/language/ir-testsuite/tests`.
  - File extension: `.mvir`.
  - Command to run the tests: `cargo run -p ir-testsuite`.

While we recommend that you use the source language, there are more tests written in the IR currently, and you may find them helpful to understand how e2e tests work.

Next, we will go over the details of the testing framework using an example in the Move source language. The knowledge and metasyntax also apply to tests written in the IR. The only difference between the two is the syntax of the actual code.

## Test file structure

Here's a sample Move test that simulates a simple P2P payment scenario: Alice sends 200 microlibra to Bob and Bob checks that he has received the funds. We've also included a transaction that will fail in the end: Bob tries to overdraft from his account and send money back to Alice.

<img alt="" src="/img/diagram_2_example_test.svg">

This file can be broken into the following parts:

- **Global configs**: config entries to set up the initial state of the chain.
- **Transactions (w/ configs)**: source code and configurations specific to each transaction.
- **//! new-transaction**: a special marker to tell the test drive where to split the transactions.
- **Checker directives**: string patterns to search for in the log.

As you may have noted, the configs and directives are extracted from comments with special syntax. We will cover their effects later. Normal comments are simply ignored.

## Configurations

There are two types of configs you can specify: **global configs** and **transaction configs**. Global configs are used to set up the initial state of the chain, and transaction configs specify the properties associated with each transaction.

### List of global configs

#### Account setup

```
//! account: \<alias>, [initial balance], [initial sequence number], [role]
```

Creates an account that can be used later in tests. Optionally, it's possible to specify the following parameters:

- Initial account balance (in microlibras)
  - Default: 1,000,000
- Initial sequence number
  - Default: 0
- Role of the account, if any
  - Available options: validator
  - Default: none

The alias can be used in the code to refer to the address of the account with the `{{alias}}` syntax. For example:

```
//! account: alice
import {{alice}}.M;
```

Here {{alice}} will be replaced by the real address of the account, which is generated at the beginning of the simulation.

The {{default}} account alias always exists and is the sender of all transactions unless the transaction config specifies otherwise (see below).

### List of transaction configs

#### Sender

```
//! sender: \<alias>
```

Specifies the sender of the transaction using aliases defined by the account configs.

Default: "default". (The default account.)

#### Transaction arguments

```
//! args: \<arg1>, \<arg2>, ...
```

Specifies the transaction arguments. It has no effect if the transaction is a module publishing transaction.

Examples:

```
//! args: 0, 0x0, {{default}}, true
```

This specifies four transaction arguments: u64(0), address 0x0, address of account "default", and boolean true.

Default: none.

#### Max gas

```
//! max-gas: \<integer value>
```

This specifies the maximum gas units to pay for this transaction.

Default: current balance in account.

#### Sequence number

```
//! sequence-number: \<integer value>
```

Overrides the sequence number used to sign the transaction.

Default: current sequence number of the account.

#### No-run

```
//! no-run: \<stage1>, \<stage2>, ...
```

Does not run the transaction through certain stages in the pipeline. Valid values are: "compiler," "verifier," "serializer," and "runtime." This feature should only be used if you are testing one of the earlier phases.

Default: none.

#### Expiration time

```
//! expiration-time: \<integer value>
```

Overrides the "expiration-time" of the current transaction. This is the time since the beginning of the testing harness.

Default: 40,000 seconds.

## The evaluation log

Running the transactions above will result in the following evaluation log being generated:

```
  [0] Transaction(0)
  [1] Stage(Compiler)
  [2] Output(CompiledScript(CompiledScript(CompiledScriptMut { module_handles:
[ModuleHandle { address: AddressPoolIndex(0), name: IdentifierIndex(0) },
ModuleHandle { address: AddressPoolIndex(1), name: IdentifierIndex(2) }, ModuleHandle
{ address: AddressPoolIndex(1), name: IdentifierIndex(4) }], struct_handles:
[StructHandle { module: ModuleHandleIndex(2), name: IdentifierIndex(5),
is_nominal_resource: true, type_formals: [] }], function_handles: [FunctionHandle
{ module: ModuleHandleIndex(0), name: IdentifierIndex(1), signature:
FunctionSignatureIndex(0) }, FunctionHandle { module: ModuleHandleIndex(1), name:
IdentifierIndex(3), signature: FunctionSignatureIndex(1) }, FunctionHandle { module:
ModuleHandleIndex(1), name: IdentifierIndex(6), signature:
FunctionSignatureIndex(2) }, FunctionHandle { module: ModuleHandleIndex(1), name:
IdentifierIndex(7), signature: FunctionSignatureIndex(3) }], type_signatures: [],
function_signatures: [FunctionSignature { return_types: [], arg_types: [Address],
type_formals: [] }, FunctionSignature { return_types: [U64], arg_types: [Address],
type_formals: [] }, FunctionSignature { return_types: [Struct(StructHandleIndex(0),
[])], arg_types: [U64], type_formals: [] }, FunctionSignature { return_types: [],
arg_types: [Address, Struct(StructHandleIndex(0), [])], type_formals: [] }],
locals_signatures: [LocalsSignature([Address, U64, U64, Bool, U64]),
LocalsSignature([])], identifiers: [Identifier("<SELF>"), Identifier("main"),
Identifier("LibraAccount"), Identifier("balance"), Identifier("LibraCoin"),
Identifier("T"), Identifier("withdraw\_from\_sender"), Identifier("deposit")],
byte_array_pool: [], address_pool:
[90290bb38b30fa2971e969687609cacbee3b984b60547bbf17e5d9cdf28b9cb3,
0000000000000000000000000000000000000000000000000000000000000000], main:
FunctionDefinition { function: FunctionHandleIndex(0), flags: 0,
acquires_global_resources: [], code: CodeUnit { max_stack_size: 3, locals:
LocalsSignatureIndex(0), code: [GetTxnSenderAddress, Call(1,
LocalsSignatureIndex(1)), StLoc(2), MoveLoc(0), LdU64(200), Call(2,
LocalsSignatureIndex(1)), Call(3, LocalsSignatureIndex(1)), GetTxnSenderAddress,
Call(1, LocalsSignatureIndex(1)), StLoc(1), MoveLoc(2), MoveLoc(1), LdU64(200), Add,
Eq, StLoc(3), MoveLoc(3), BrTrue(19), Branch(20), Branch(22), LdU64(42), Abort,
Ret] } } })))
  [3] Stage(Verifier)
  [4] Stage(Serializer)
  [5] Stage(Runtime)
  [6] Output(TransactionOutput(TransactionOutput { write_set: WriteSet(WriteSetMut
{ write_set: [(AccessPath { address:
0000000000000000000000000000000000000000000000000000000000000fee, path:
0116608f05d24742a043e6fd12d3b32735f6bfcba287bea92b28a175cd4f3eee32 },
Value(200000000000000000000000000000000000000000000000000000000000000000000feef0b4000
0000000000001000000000000000028000000000000000000000000000000000000000000000000000000
00000000000000000000000000000fee00000000000000002800000001000000000000000000000000000
000000000000000000000000000000000000000000000000fee00000000000000000200000000000000))
, (AccessPath { address:
90290bb38b30fa2971e969687609cacbee3b984b60547bbf17e5d9cdf28b9cb3, path:
0116608f05d24742a043e6fd12d3b32735f6bfcba287bea92b28a175cd4f3eee32 },
Value(2000000090290bb38b30fa2971e969687609cacbee3b984b60547bbf17e5d9cdf28b9cb3d8a9000
0000000000000000000000000000028000000bfef69f45a06aee94e6a2162982deab3c255ec55d6a6b544
85b8c9df5434f8ea04c977764fc2a1e1010000000000000028000000a132d7cb21a7d87f3ea9d99972894
9a0d99e5a1a4ef311a45b19989e2aa0012f9d1065ffe397626201000000000000000200000000000000))
, (AccessPath { address:
c05a7b73d232d21975fd6031c69c3bc35f9a45b6bba55da7179ba33ec0aa6849, path:
0116608f05d24742a043e6fd12d3b32735f6bfcba287bea92b28a175cd4f3eee32 },
Value(20000000c05a7b73d232d21975fd6031c69c3bc35f9a45b6bba55da7179ba33ec0aa68495860010
0000000000000010000000000000028000000fa622bac26e59266e6463ae2a13122fa2ce48eb45a17e2f8
6ff42a19f5396b2d3d69779dfbf7f7b1000000000000000028000000e578b9247e250b646906d9cf1a265
2069603d256a21e3bb4b81f8f4d8bb10a18c862e337eb133c6500000000000000000200000000000000))
] }), events: [ContractEvent { key: EventKey([161, 50, 215, 203, 33, 167, 216, 127,
62, 169, 217, 153, 114, 137, 73, 160, 217, 158, 90, 26, 78, 243, 17, 164, 91, 25,
152, 158, 42, 160, 1, 47, 157, 16, 101, 255, 227, 151, 98, 98]), index: 0, type:
Struct(StructTag { address:
0000000000000000000000000000000000000000000000000000000000000000, module:
Identifier("LibraAccount"), name: Identifier("SentPaymentEvent"),
type_params: [] }), event_data: "c800000000000000c05a7b73d232d21975fd6031c69c3bc35f9a
45b6bba55da7179ba33ec0aa684900000000" }, ContractEvent { key: EventKey([250, 98, 43,
172, 38, 229, 146, 102, 230, 70, 58, 226, 161, 49, 34, 250, 44, 228, 142, 180, 90,
23, 226, 248, 111, 244, 42, 25, 245, 57, 107, 45, 61, 105, 119, 157, 251, 247, 247,
177]), index: 0, type: Struct(StructTag { address:
0000000000000000000000000000000000000000000000000000000000000000, module:
Identifier("LibraAccount"), name: Identifier("ReceivedPaymentEvent"),
type_params: [] }), event_data: "c80000000000000090290bb38b30fa2971e969687609cacbee3b
984b60547bbf17e5d9cdf28b9cb300000000" }], gas_used: 46320, status:
Keep(VMStatus { major_status: EXECUTED, sub_status: None, message: None }) }))
  [7] Status(Success)
  [8] Transaction(1)
  [9] Stage(Compiler)
  [10] Output(CompiledScript(CompiledScript(CompiledScriptMut { module_handles:
[ModuleHandle { address: AddressPoolIndex(0), name: IdentifierIndex(0) },
ModuleHandle { address: AddressPoolIndex(1), name: IdentifierIndex(2) }],
struct_handles: [], function_handles: [FunctionHandle { module:
ModuleHandleIndex(0), name: IdentifierIndex(1), signature:
FunctionSignatureIndex(0) }, FunctionHandle { module: ModuleHandleIndex(1),
name: IdentifierIndex(3), signature: FunctionSignatureIndex(1) }],
type_signatures: [], function_signatures: [FunctionSignature { return_types: [],
arg_types: [], type_formals: [] }, FunctionSignature { return_types: [U64],
arg_types: [Address], type_formals: [] }], locals_signatures:
[LocalsSignature([Bool, U64]), LocalsSignature([])],
identifiers: [Identifier("\<SELF>"), Identifier("main"), Identifier("LibraAccount"),
Identifier("balance")], byte_array_pool: [], address_pool:
[c05a7b73d232d21975fd6031c69c3bc35f9a45b6bba55da7179ba33ec0aa6849,
0000000000000000000000000000000000000000000000000000000000000000], main:
FunctionDefinition { function: FunctionHandleIndex(0), flags: 0,
acquires_global_resources: [], code: CodeUnit { max_stack_size: 2, locals:
LocalsSignatureIndex(0), code: [GetTxnSenderAddress, Call(1,
LocalsSignatureIndex(1)), LdU64(90200), Eq, StLoc(0), MoveLoc(0), BrTrue(8),
Branch(9), Branch(11), LdU64(42), Abort, Ret] } } })))
  [11] Stage(Verifier)
  [12] Stage(Serializer)
  [13] Stage(Runtime)
  [14] Output(TransactionOutput(TransactionOutput { write_set: WriteSet(WriteSetMut
{ write_set: [(AccessPath { address:
0000000000000000000000000000000000000000000000000000000000000fee, path:
0116608f05d24742a043e6fd12d3b32735f6bfcba287bea92b28a175cd4f3eee32 },
Value(200000000000000000000000000000000000000000000000000000000000000000000fee46c5000
0000000000001000000000000000028000000000000000000000000000000000000000000000000000000
00000000000000000000000000000fee00000000000000002800000001000000000000000000000000000
000000000000000000000000000000000000000000000000fee00000000000000000200000000000000))
, (AccessPath { address:
c05a7b73d232d21975fd6031c69c3bc35f9a45b6bba55da7179ba33ec0aa6849, path:
0116608f05d24742a043e6fd12d3b32735f6bfcba287bea92b28a175cd4f3eee32 },
Value(20000000c05a7b73d232d21975fd6031c69c3bc35f9a45b6bba55da7179ba33ec0aa68490250010
0000000000000010000000000000028000000fa622bac26e59266e6463ae2a13122fa2ce48eb45a17e2f8
6ff42a19f5396b2d3d69779dfbf7f7b1000000000000000028000000e578b9247e250b646906d9cf1a265
2069603d256a21e3bb4b81f8f4d8bb10a18c862e337eb133c6501000000000000000200000000000000))
] }), events: [], gas_used: 4182, status: Keep(VMStatus { major_status: EXECUTED,
sub_status: None, message: None }) }))
  [15] Status(Success)
  [16] Transaction(2)
  [17] Stage(Compiler)
  [18] Output(CompiledScript(CompiledScript(CompiledScriptMut { module_handles:
[ModuleHandle { address: AddressPoolIndex(0), name: IdentifierIndex(0) },
ModuleHandle { address: AddressPoolIndex(1), name: IdentifierIndex(2) },
ModuleHandle { address: AddressPoolIndex(1), name: IdentifierIndex(4) }],
struct_handles: [StructHandle { module: ModuleHandleIndex(1), name:
IdentifierIndex(3), is_nominal_resource: true, type_formals: [] }],
function_handles: [FunctionHandle { module: ModuleHandleIndex(0), name:
IdentifierIndex(1), signature: FunctionSignatureIndex(0) }, FunctionHandle { module:
ModuleHandleIndex(2), name: IdentifierIndex(5), signature:
FunctionSignatureIndex(1) }, FunctionHandle { module: ModuleHandleIndex(2), name:
IdentifierIndex(6), signature: FunctionSignatureIndex(2) }], type_signatures: [],
function_signatures: [FunctionSignature { return_types: [], arg_types: [Address],
type_formals: [] }, FunctionSignature { return_types: [Struct(StructHandleIndex(0),
[])], arg_types: [U64], type_formals: [] }, FunctionSignature { return_types: [],
arg_types: [Address, Struct(StructHandleIndex(0), [])], type_formals: [] }],
locals_signatures: [LocalsSignature([Address]), LocalsSignature([])], identifiers:
[Identifier("\<SELF>"), Identifier("main"), Identifier("LibraCoin"),
Identifier("T"), Identifier("LibraAccount"), Identifier("withdraw\_from\_sender"),
Identifier("deposit")], byte_array_pool: [], address_pool:
[c05a7b73d232d21975fd6031c69c3bc35f9a45b6bba55da7179ba33ec0aa6849,
0000000000000000000000000000000000000000000000000000000000000000], main:
FunctionDefinition { function: FunctionHandleIndex(0), flags: 0,
acquires_global_resources: [], code: CodeUnit { max_stack_size: 2, locals:
LocalsSignatureIndex(0), code: [MoveLoc(0), LdU64(100000), Call(1,
LocalsSignatureIndex(1)), Call(2, LocalsSignatureIndex(1)), Ret] } } })))
  [19] Stage(Verifier)
  [20] Stage(Serializer)
  [21] Stage(Runtime)
  [22] VMExecutionFailure(TransactionOutput { write_set: WriteSet(WriteSetMut
{ write_set: [(AccessPath { address:
0000000000000000000000000000000000000000000000000000000000000fee, path:
0116608f05d24742a043e6fd12d3b32735f6bfcba287bea92b28a175cd4f3eee32 },
Value(200000000000000000000000000000000000000000000000000000000000000000000fee87d6000
0000000000001000000000000000028000000000000000000000000000000000000000000000000000000
00000000000000000000000000000fee00000000000000002800000001000000000000000000000000000
000000000000000000000000000000000000000000000000fee00000000000000000200000000000000))
, (AccessPath { address:
c05a7b73d232d21975fd6031c69c3bc35f9a45b6bba55da7179ba33ec0aa6849, path:
0116608f05d24742a043e6fd12d3b32735f6bfcba287bea92b28a175cd4f3eee32 },
Value(20000000c05a7b73d232d21975fd6031c69c3bc35f9a45b6bba55da7179ba33ec0aa6849c13e010
0000000000000010000000000000028000000fa622bac26e59266e6463ae2a13122fa2ce48eb45a17e2f8
6ff42a19f5396b2d3d69779dfbf7f7b1000000000000000028000000e578b9247e250b646906d9cf1a265
2069603d256a21e3bb4b81f8f4d8bb10a18c862e337eb133c6502000000000000000200000000000000))
] }), events: [], gas_used: 4417, status: Keep(VMStatus { major_status: ABORTED,
sub_status: Some(10), message: None }) })
  [23] Status(Failure)
```

The log consists of mostly debug dumps of the outputs and errors, if there are any.

## Checking the log using directives

In the test file, we have defined the following directives:

```
// check: EXECUTED
...
// check: EXECUTED
...
// check: ABORTED 10
```

This means we are searching for the strings "EXECUTED," "EXECUTED," and "ABORTED" in the log:

```
info: Successful Matches
[6] ...Keep(VMStatus { major_status: EXECUTED, sub_status: None, message: None }) }))
                                     15 | // check: EXECUTED

[14] ...Keep(VMStatus { major_status: EXECUTED, sub_status: None, message: None }) }))
                                     26 | // check: EXECUTED

[22] ...Keep(VMStatus { major_status: ABORTED, sub_status: Some(10), message: None }) })
                                     37 | // check: ABORTED 10

[22] ...us: ABORTED, sub_status: Some(10), message: None }) })
                                     37 | // check: ABORTED 10
```

Since all of our directives match and we do not have any errors in the log, this test is considered "passing."

It's required that all error entries get matched or the test is considered "failing." If we omit the last directive (`// check: ABORTED 10`), we'll see the following error message:

```
**error:** Unmatched Errors
  [22] VMExecutionFailure(TransactionOutput { write_set:
WriteSet(WriteSetMut { write_s...
```

The test will also fail if your directive does not match anything in the log:

```
// check: does_not_exist

error: Unmatched Directives
    37 | // check: does_not_exist
```

You can combine multiple checks into one line:

```
// check: ABORTED 10
```

is equivalent to

```
// check: ABORTED
// check: 10

matches:
  [25] ...Keep(VMStatus { major_status: ABORTED, sub_status:
Some(10), message: None }) })
                                        40 | // check: ABORTED 10

  [25] ...us: ABORTED, sub_status: Some(10), message: None }) })
                                        40 | // check: ABORTED 10
```

Negative matches can be specified using the `// not` directive. It is useful for patterns like the following:

```
// check: ABORTED
// not: 10
// check: None
```

This tries to find an "ABORTED" and a "None" with no "10" in them. Running it against the log above results in a failure:

```
error: Negative Match
  [22] ...us: ABORTED, sub_status: Some(10), message: None }) })
                                        38 | // not: 10
```

## Internals of the testing framework (advanced)

For developers who want to learn more about or hack with the internals of the e2e testing framework, here's a detailed breakdown of the components:

<img alt="" src="/img/diagram_3_e2e_pipeline_full.svg">

## Future work

The E2E testing framework will evolve as we develop the Move platform. We are planning the following improvements in the future:

- Clean and modular APIs that can be called from custom Rust code
- More powerful checker directives that allow regexes and variable definitions
- The option to not use the checker, but compare the log with a file that contains the expected output
