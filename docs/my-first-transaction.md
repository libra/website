---
id: my-first-transaction
title: My First Transaction
---

## Overview

This document guides you through executing your first transaction on the Libra Blockchain.  Before you follow the steps and execute your first transaction, we recommend that you read the following documents to familiarize yourself with the key aspects of the Libra ecosystem and the Libra protocol.

* [Welcome](welcome)
* [The Libra protocol](libra-protocol)

We provide a command line interface (CLI) client to interact with the blockchain.

## Assumptions

* All commands in this document assume a Linux or macOS system.
* A stable connection to the Internet.
* What else??

## Steps to Submit a Transaction

In this example, we'll download the necessary Libra components and execute a transaction between two users: Alice and Bob.

Perform the following steps to submit a transaction to a validator node on the Libra testnet :

1. [Clone](https://fb.quip.com/sIrOAbc770Kq#cXKACAK7mFs) and build[Libra Core](https://fb.quip.com/sIrOAbc770Kq#cXKACAK7mFs).
2. [Build the Libra CLI client](https://fb.quip.com/sIrOAbc770Kq#cXKACAUgmWW) and connect to testnet.
3. [Create Alice's and Bob's account](https://fb.quip.com/sIrOAbc770Kq#cXKACAtvPLG).
4. [Mint coins and add to Alice's and Bob's account](https://fb.quip.com/sIrOAbc770Kq#cXKACAOcYNl).
5. [Submit a transaction](https://fb.quip.com/sIrOAbc770Kq#cXKACAShh4g).

## Clone and Build Libra Core

### Clone the Libra Core repo

```
$ git clone git@github.com:libra/libra.gits
```

### Build Libra Core

To setup Libra Core, change to the `libra` directory and run the setup script as shown below.

```
setup_scripts/dev_setup_mac.sh
```

The setup script performs the following actions:

* Installs **rustup** - rustup is an installer for the systems programming language Rust.
* Updates to **nightly rust - ?**
* Installs **cmake** - to manage the build process.
* Installs **protoc** - a compiler for protocol buffers.
* Initializes **Submodule** - Submodules allow you to keep a Git repository as a subdirectory of another Git repository. This lets you clone another repository into your project and keep your commits separate.
* Builds Libra server.

### Troubleshoot libra core build

If your setup fails, try the following:

* Update Rust:
    * run `rustup update` from your libra directory
* Remove cargo lock file:
    * `rm Cargo.lock`
* Re-run setup script from your libra directory:
    * `setup_scripts/dev_setup_mac.sh`

## Build Libra CLI Client and Connect To Testnet

To connect to a node running on the Libra testnet, change to your `client` directory and run the client as shown below.

```
$ cargo run -p client --bin client -- -a ac.stable.aws.hlw3truzy4ls.com -p 80 -m mint.key
```

This command **builds and runs** the client and connects to a validator node on testnet:

* [ac.stable.aws.hlw3truzy4ls.com](http://ac.stable.aws.hlw3truzy4ls.com/) - is the hostname for the node running on testnet.
* 80 - is the port on which the client will communicate with the testnet.
* mint.key contains information about the Association account used for minting Libra coins.

Once the client connects to a node on testnet you will see the following output.  To quit the client at any time, use the `quit` command.

```

usage: <command> <args>

Use the following commands:

account | a
        Account operations
debug | d
        Debug operations
query | q
        Query operations
transfer | t
        Transfer operations
help | h
        Prints this help
quit | q!
        Exit this client


Please, input commands:

libra%
```

### Troubleshoot client build and run

If your client did not connect to the testnet you will see the following error:
TBD error message(s)

To troubleshoot:

* Check your internet connection.
* Ensure that you are using the latest version of the client. Pull the latest Libra Core and run the client again:  
  `cargo run -p client --bin client -- -a ac.stable.aws.hlw3truzy4ls.com -p 80 -m mint.key`

## Create Alice's and Bob's Account

Once your client is connected to the testnet, you can run CLI commands to create Alice's and Bob's accounts.

### **Step 1 - Check if the CLI client is running on your system**

A `libra%` command line prompt indicates that your Libra CLI client is running. To see the help information for the `account` command enter “account” as shown below:

```
libra% account
usage: account <arg>

Use the following args for this command:

create | c
    Create an account. Returns reference ID to use in other operations
list | la
    Print all accounts that were created or loaded
recover | r <file path>
    Recover Libra Wallet from the file path
write | w <file name>
    Save Libra Wallet mnemonic recovery seed to disk
mint | mintb | m | mb <receiver account> <number of coins>
    Mint coins to the account. Suffix 'b' is for blocking

libra%
```

### Step 2 - Create Alice's account

Note that creating an account using the CLI does not update the blockchain. It just creates a local key-pair.

**To create an account enter this command:**  
`libra% account create`

**Sample output on success:**  
`>> Creating/retrieveing next account from wallet`  
`Created account #0 address f2c74d3b046157cb967c1a872c8671d35e2e09163461010733649a5e50d016ed`

**0** - is the index of Alice's account and the hex number is the address of Alice's account. The index is just a way to refer to Alice's account.

* The account index is a local index for users to conveniently refer to the accounts they created.
* It is a shorthand used by the Libra CLI client, it does not mean anything for the blockchain.
* This index can be used in other CLI commands.
* Each instance of the Libra client can create an account with the same index (for example, each instance of the client can have an account with index 0), but the __account address/key-pair will be different for each account created on testnet.__

**address** - The hex number following “address” is the address of Alice's account.  
If your `account create` command did not succeed, refer to the [troubleshooting](https://fb.quip.com/sIrOAbc770Kq#cXKACATsijK) section.


### Step 3 - Create BOB's account

**Enter this command**  
`libra% account create`  
**Sample output on success**  
`>> Creating/retrieveing next account from wallet`  
`Created account #1 address 8cb38077e0af0ff77c0da7f6ea1acc9585c98c40443b5ea2ffaa8f1507ba9608`

**1** - is the index for Bob's account and the hex number is the address of Bob's account. The index is just a way to refer to Bob's account. It is a shorthand used by the Libra CLI, it does not mean anything for the blockchain. This index can be used in other commands.  
**address** - The hex number following “address” is the address of Bob's account.  
If your `account create` command did not succeed, refer to the [troubleshooting](https://fb.quip.com/sIrOAbc770Kq#cXKACATsijK) section.

### Step 4 (optional) - List Accounts

To list the accounts you have created
**Enter this command**  
`libra% account list`  
**Sample output on success**  
`User account index: 0, address: 578560b3d71b86fab5f434a83b51bab1b753dde4c995ef7407d413159acbfb65, sequence number: 0`  
`User account index: 1, address: 277abee863eae6d266cc3a63827379ea6f4c1191ffd8fcc3286a2ba203495f24, sequence number: 0`  
`Faucet account address: 0000000000000000000000000000000000000000000000000000000000000000, sequence_number: 5`  

**Mint account address** - is the address of the Association account used for minting Libra coins.  
The **sequence number** for an account indicates the number of transactions that have been sent from that account. It is incremented every time a transaction sent from that account is executed and stored in the blockchain. To know more, refer to the LINK [Libra glossary definition of the sequence number].

### Troubleshoot account creation

If your account create command did not succeed you will see the following error:
TBD

To troubleshoot:

* Check internet connection
* Check if your client is running.
* Check if your client is connected to testnet. TBD How?

## Add Libra Coins to Alice's and Bob's Account

Minting and adding coins to accounts on testnet is done via **Faucet**. Faucet is a service running on AWS along with the testnet. This service only exists to facilitate minting coins for testnet. It creates Libra with no real world value. Assuming you have [created Alice's and Bob's account](https://fb.quip.com/sIrOAbc770Kq#cXKACAtvPLG), with index 0 and index 1 respectively, you can follow the steps below to add Libra to both accounts.

### Step 1 - Add 110 Libra to Alice's account

To mint Libra and add to Alice's account
**Enter this command**  
`libra%   account mint 0 110`  
0 is the index of Alice's account  
110  is the amount of Libra to be added to Alice's account.  

**Sample output on success**  
`>> Minting coins`  
`Finished minting!`

If your `account mint` command did not succeed refer to the [troubleshooting section.](https://fb.quip.com/sIrOAbc770Kq#cXKACAc20qI)

### Step 2 - Add 52 Libra to BOB's account

To mint Libra and add to Bob's account  
**Enter this command**  
`libra%   account mint 1 52`  
1 is the index of Bob's account  
52  is the amount of Libra to be added to Bob's account.

**Sample output on success**  
`>> Minting coins`  
`Finished minting!`

If your `account mint` command did not succeed refer to the [troubleshooting section.](https://fb.quip.com/sIrOAbc770Kq#cXKACAc20qI)

### Step 3 - Check the balance

To check the balance in Alice's account:  
**Enter this command**  
`libra%   query balance 0 `  
**Sample output on success**  
`Balance is: 110`  

To check the balance in Bob's account:  
**Enter this command**  
`libra%   query balance 1 `  
**Sample output on success**  
`Balance is: 52`  

### Troubleshoot Minting and Adding Money to Account

If the node you connected to on testnet is unavailable, you will get a “Server unavailable” message as shown below:  
`libra% account mint 0 110 `  
`>> Minting coins `  
`[ERROR] Error minting coins: Server unavailable, please retry and/or check if host passed to client is running`

If your connection times out you will see the following error:  
`$ account mint 0 110`  
`>> Minting coins`  
`[ERROR] Error minting coins: RpcFailure(RpcStatus { status: DeadlineExceeded, details: Some("Deadline Exceeded") })`

If there are problems with the faucet service you will see the following error:  
`$ account mint 0 110 >> Minting coins `  
`[ERROR] Error minting coins: Transaction failed with mempool status: InvalidUpdate`

If you get the following error, retry the mint command and check if the account exists:  
`[ERROR] Error minting coins: Transaction failed with vm status: ValidationStatus(SequenceNumberTooOld), please retry your transaction.`

To check if an account exists, query the account state. For an account with index 0 enter this command:  
`libra% query account_state 0`

## Submit a Transaction

Before we submit a transaction to transfer Libra from Alice's account to Bob's account, we will query the sequence number of each account. This will help us understand how executing a transaction changes the sequence number of each account.

### **Query Sequence Number**

`$ query sequence 0`  
`>> Getting current sequence number`  
`Sequence number is: 0`  
`$ query sequence 1`  
`>> Getting current sequence number`  
`Sequence number is: 0`  

In `query sequence 0`, 0 is the index of Alice's account. A sequence number of 0 for both Alice's and Bob's account indicates that no transactions either Alice's or Bob's account have been executed so far.

### Transfer Money

To submit a transaction to transfer 10 Libra from Alice's account to Bob's account  
**Enter this command**  
`libra%   transfer 0 1 10 `  
0 is the index of Alice's account.  
1 is the index of Bob's account.  
10 is the number of Libra to transfer from Alice's to Bob's account.  
**Sample output on success**  
`>> Transferring`  
`Transaction submitted to validator`  
`To query for transaction status, run: query txn_acc_seq 0 0`  

You can use the command `query txn_acc_seq 0 0` to retrieve the information about the transaction you just submitted. To see a sample output of this command refer to [Sample outputs - query txn_acc_seq](https://fb.quip.com/sIrOAbc770Kq#cXKACA7aru0) 0 0

You just submitted your transaction to a validator node and it was included in the [mempool](https://fb.quip.com/LkbMAEBIVNbh#ffYACAGR6Mv) of the validator. This doesn't necessarily mean your transaction has been executed. In theory, if the system was slow or overloaded, it would take some time to see the results and you may have to check multiple times.

You can use  the `transferb` command (as shown below), instead of the `transfer` command. `transferb` will submit the transaction and return to the client prompt **only after** the transaction has been committed to the blockchain.
`libra%   transferb 0 1 10 `

Refer to [Life of a Transaction](https://fb.quip.com/0fQ1AzLdEXiQ) for an understanding of the lifecycle of a transaction from submission to execution and storage.

### Query Sequence number After Transfer

`$ query sequence 0`  
`>> Getting current sequence number`  
`Sequence number is: 1`  
`$ query sequence 1`  
`>> Getting current sequence number`  
`Sequence number is: 0`  

The sequence number of 1 for Alice's account (index 0) indicates that one transaction has been sent from Alice's account so far. The sequence number of 0 for Bob's account (index 1) indicates that no transaction has been sent from Bob's account so far. Every time a transaction is sent from an account the sequence number is incremented by 1.

### Check The Balance in Both Accounts After Transfer

To check the final balance in both accounts query the balance again for each account as you did in [this step](https://fb.quip.com/sIrOAbc770Kq#cXKACAHw03h). If your transaction (transfer) executed successfully you should see 100 Libra in Alice's account and 62 Libra in Bob's account.

```
libra%   query balance 0
Balance is: 100
libra%   query balance 1
Balance is: 62
```

**Congratulations!** you have successfully executed your transaction on the Libra testnet and transferred 10 Libra from Alice's account to Bob's account!

### Troubleshoot The transfer command

If the testnet node (your client was connected to) is unavailable, or your connection to testnet has timed-out, you will see the following error:  
`$ transfer 0 1 10`  
`>> Transferring`  
`[ERROR] Failed to perform transaction: Server unavailable, please retry and/or check if host passed to client is running`

If there is a problem with executing the transaction you will see the following error:  
`$ transfer 0 1 10 `  
`>> Transferring `  
`[ERROR] Failed to perform transaction: Transaction failed with vm status: ExecutionStatus(MissingData)`

To troubleshoot:

* Check the connection to testnet - How? TBD
* Query the sender and recipient account to make sure the accounts  exist. Use the following commands for accounts with index 0 and 1:
    * `query account_state 0`
    * `query account_state 1`
* You can try quitting the client using  `quit` or `q!`  and run the following command again to connect to testnet:  
  `cargo run -p client --bin client -- -a ac.stable.aws.hlw3truzy4ls.com -p 80 -m mint.key`

## Sample Outputs

## query txn_acc_seq 0 0

```
libra% query txn_acc_seq 0 0
>> Getting committed transaction by account and sequence number
Committed transaction: SignedTransaction {
 { raw_txn: RawTransaction {
    sender: f69146bc8fb77fe98b241341a7734e1a71f45d6715aec3689dbdc87c9455fd64,
    sequence_number: 0,
    payload: Program(
        Program {
            code: "LIBRAVM\n\u{1}\u{0}\u{7}\u{1}J\u{0}\u{0}\u{0}\u{4}\u{0}\u{0}\u{0}\u{3}N\u{0}\u{0}\u{0}\u{6}\u{0}\u{0}\u{0}\u{c}T\u{0}\u{0}\u{0}\u{5}\u{0}\u{0}\u{0}\rY\u{0}\u{0}\u{0}\u{4}\u{0}\u{0}\u{0}\u{5}]\u{0}\u{0}\u{0}$\u{0}\u{0}\u{0}\u{4}�\u{0}\u{0}\u{0} \u{0}\u{0}\u{0}\u{7}�\u{0}\u{0}\u{0}\r\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{1}\u{0}\u{2}\u{0}\u{1}\u{3}\u{0}\u{2}\u{0}\u{2}\u{4}\u{2}\u{3}\u{2}\u{4}\u{2}\u{6}<SELF>\u{7}Account\u{4}main\u{f}pay_from_sender\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{1}\u{2}\u{0}\u{4}\u{0}\u{c}\u{0}\u{c}\u{1}\u{11}\u{1}\u{2}",
            args: [
                {ADDRESS: 6337a51e6c9ef28fc6107381ebe778c77f5b9552d5c92ab042f4bfbb6d947c68},
                {U64: 10000000},
            ],
        },
    ),
    note: "{\"creation_time\":1559941072042}",
    max_gas_amount: 10000,
    gas_unit_price: 0,
    expiration_time: 1559941172s,
},
 public_key: 30ce0d1e0fe8321c4b769f1aaced0da86c452a02fd8c9e213b364b703f4fcadd,
 signature: Signature( R: CompressedEdwardsY: [142, 232, 49, 46, 109, 18, 197, 140, 38, 22, 188, 32, 24, 93, 5, 255, 242, 192, 7, 176, 74, 218, 113, 48, 251, 0, 153, 194, 15, 139, 226, 26], s: Scalar{
    bytes: [101, 17, 216, 10, 42, 0, 135, 246, 228, 179, 234, 252, 104, 196, 59, 110, 32, 138, 52, 32, 102, 204, 14, 58, 169, 38, 93, 29, 119, 57, 168, 3],
} ),
 }
 }
```




## Life of a Transaction

Once you have executed your first transaction, you may refer to the document [Life of a Transaction](https://fb.quip.com/NQc6AXFKc3go) for:

* A look under the hood at the lifecycle of a transaction from submission to execution.
* An understanding of the interactions between each logical component of a Libra validator, as transactions get submitted and executed in the Libra ecosystem.

## Reference

* To learn about the logical components of Libra Core implementation, refer to LINK: [Libra Core Crate overview] and the associated API/code documentation.
* The [CLI guide](https://fb.quip.com/7UiFAHF5mNlb) describes how to use the CLI and lists the Libra CLI commands and their usage.
* The [Libra Glossary](https://fb.quip.com/LkbMAEBIVNbh) is a quick reference for Libra terminology.


Next→[Life of a Transaction](https://fb.quip.com/NQc6AXFKc3go)


