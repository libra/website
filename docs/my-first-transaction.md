---
id: my-first-transaction
title: My First Transaction
---

## Overview

This document will guide you through executing your first transaction on the Libra Blockchain. Before you follow the steps to execute your first transaction, we recommend that you read the following documents to familiarize yourself with the key aspects of the Libra ecosystem and the Libra protocol.

* [Welcome](welcome-to-libra.md)
* [The Libra protocol - Key Concepts](libra-protocol.md)

We provide a command line interface (CLI) client to interact with the blockchain.

## Assumptions

All commands in this document assume that:

* You are running on a `Linux` (Red Hat or Debian-based) or `macOS` system.
* You have a stable connection to the internet.
* `Git` is installed on your system.
* `Homebrew` is installed on a `macOS` system.
* `yum`or `apt-get` are installed on a `Linux` system.

## Steps to Submit a Transaction

In this example, we'll download the necessary Libra components and execute a transaction between two users: Alice and Bob.

Perform the following steps to submit a transaction to a validator node on the Libra testnet:

1. [Clone and build Libra Core](#clone-and-build-libra-core).
2. [Build the Libra CLI client and connect to the testnet](#build-libra-cli-client-and-connect-to-testnet).
3. [Create Alice's and Bob's account](#create-alice-s-and-bob-s-account).
4. [Mint coins and add to Alice's and Bob's account](#add-libra-coins-to-alice-s-and-bob-s-accounts).
5. [Submit a transaction](#submit-a-transaction).

## Clone and Build Libra Core

### Clone the Libra Core repo

```bash
$ git clone https://github.com/libra/libra.git
```

### Setup Libra Core

To setup Libra Core, change to the `libra` directory and run the setup script to install the dependencies, as shown below:

```
./scripts/dev-setup.sh
```
The setup script performs these actions:

* Installs rustup - rustup is an installer for the Rust programming language Libra Core is implemented in.
* Installs the required versions of the rust-toolchain.
* Installs CMake - to manage the build process.
* Installs protoc - a compiler for protocol buffers.
* Installs Go (for building protocol buffers).

If your setup fails, see [Troubleshooting](#setup)

## Build Libra CLI Client and Connect to the Testnet

To connect to a validator node running on the Libra testnet, change to the `client` directory and run the client as shown below.

```bash
$ cargo run -p client --bin client -- -a ac.stable.aws.hlw3truzy4ls.com -p 80
```

This command builds and runs the client utilizing cargo (Rust’s package manager) and connects the client to a validator node on testnet:

* [ac.stable.aws.hlw3truzy4ls.com](http://ac.stable.aws.hlw3truzy4ls.com/) - Is the hostname for the node running on testnet.
* 80 - Is the port on which the client will communicate with the testnet.

Once the client connects to a node on testnet, you will see the following output.  To quit the client at any time, use the `quit` command.

```bash
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

If you have problems building the client and connecting to the testnet, refer to [Troubleshooting](#client-build-and-run).

**Note**: If you would like to run a validator node locally on your system, follow the instructions in [Run a Local Validator Node](#run-a-local-validator-node). The instructions for creating accounts, minting coins, and performing a transaction are the same as that for a node on testnet.

## Create Alice's and Bob's Account

Once your client is connected to the testnet, you can run CLI commands to create new accounts.  We will walk you through creating accounts for two users (let's call them Alice and Bob).

### Step 1 - Check if the CLI client is running on your system

A **libra%** command line prompt indicates that your Libra CLI client is running. To see the help information for the `account` command enter “account” as shown below:

```bash
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

Note that creating an account using the CLI does not update the blockchain, it just creates a local key-pair.

To create Alice's account enter this command:

`libra% account create`

Sample output on success:

```bash
>> Creating/retrieveing next account from wallet
Created account #0 address f2c74d3b046157cb967c1a872c8671d35e2e09163461010733649a5e50d016ed
```

#0 is the index of Alice's account and the hex string is the address of Alice's account. The index is just a way to refer to Alice's account. The account index is a local CLI index that can be used in other CLI commands for users to conveniently refer to the accounts they created. The index is meaningless to the blockchain. Alice's account will be created on the blockchain only when either money is added to Alice's account via minting, or money is transferred to Alice's account via a transfer from another user. Note that you may also use the hex address in CLI commands. The account index is just a convenience wrapper around the account address.

### Step 3 - Create Bob's account

To create Bob's account, repeat the account creation command:

`libra% account create`

Sample output on success:

```bash
>> Creating/retrieveing next account from wallet
Created account #1 address 8cb38077e0af0ff77c0da7f6ea1acc9585c98c40443b5ea2ffaa8f1507ba9608
```

#1 - is the index for Bob's account and the hex number is the address of Bob's account.
For more details on index refer to [Create Alice's Account.](#step-2-create-alice-s-account)

### Step 4 (optional) - List Accounts

To list the accounts you have created
Enter this command:

`libra% account list`


Sample output on success:
```bash
User account index: 0, address: 578560b3d71b86fab5f434a83b51bab1b753dde4c995ef7407d413159acbfb65, sequence number: 0
User account index: 1, address: 277abee863eae6d266cc3a63827379ea6f4c1191ffd8fcc3286a2ba203495f24, sequence number: 0
Faucet account address: 0000000000000000000000000000000000000000000000000000000000000000, sequence_number: 5
```

Faucet account address is the address of the Faucet account used for minting Libra coins. To learn more about the Faucet service refer to [Add Libra Coins to Alice's and Bob's Accounts](#add-libra-coins-to-alice-s-and-bob-s-accounts).The sequence number for an account indicates the number of transactions that have been sent from that account. It is incremented every time a transaction sent from that account is executed and stored in the blockchain. To know more, refer to [sequence number](reference/glossary.md#sequence-number).

## Add Libra Coins to Alice's and Bob's Accounts

Minting and adding coins to accounts on testnet is done via Faucet. Faucet is a service running along with the testnet. This service only exists to facilitate minting coins for testnet and will not exist for [mainnet](reference/glossary.md#mainnet). It creates Libra with no real world value. Assuming you have [created Alice's and Bob's account](#create-alice-s-and-bob-s-account), with index 0 and index 1 respectively, you can follow the steps below to add Libra to both accounts.

### Step 1 - Add 110 Libra to Alice's account

To mint Libra and add to Alice's account

Enter this command:

`libra% account mint 0 110`

* 0 is the index of Alice's account.
* 110  is the amount of Libra to be added to Alice's account.

A successful account mint command will also create Alice's account on the blockchain.

Sample output on success:

```bash
>> Minting coins
Mint request submitted
```

Note that when the request is submitted, it means that it has been added to the mempool (of a validator node on testnet) successfully. It does not necessarily imply that it will successfully completed. Later, we will query the account balance to confirm if minting was successful.
If your account mint command did not submit your request successfully, refer to
[Troubleshooting - minting and adding coins.](#minting-and-adding-money-to-account)

### Step 2 - Add 52 Libra to BOB's account

To mint Libra and add to Bob's account

Enter this command:

`libra% account mint 1 52`

* 1 is the index of Bob's account
* 52 is the amount of Libra to be added to Bob's account.
* A successful account mint command will also create Bob's account on the blockchain. Another way to create Bob's account on the blockchain is to simply transfer money from Alice's account to Bob's account.

Sample output on success:

```bash
>> Minting coins
Mint request submitted
```
If your account mint command did not submit your request successfully, refer to
[Troubleshoot - minting and adding coins.](#minting-and-adding-money-to-account)

### Step 3 - Check the balance

To check the balance in Alice's account:

Enter this command:

`libra% query balance 0`

Sample output on success:

`Balance is: 110`

To check the balance in Bob's account:

Enter this command:
`libra% query balance 1`
Sample output on success:
`Balance is: 52`

## Submit a Transaction

Before we submit a transaction to transfer Libra from Alice's account to Bob's account, we will query the sequence number of each account. This will help us understand how executing a transaction changes the sequence number of each account.

### Query Sequence Number

```bash
libra% query sequence 0
>> Getting current sequence number
Sequence number is: 0
libra% query sequence 1
>> Getting current sequence number
Sequence number is: 0
```

In `query sequence 0`, 0 is the index of Alice's account. A sequence number of 0 for both Alice's and Bob's account indicates that no transactions from either Alice's or Bob's account have been executed so far.

### Transfer Money

To submit a transaction to transfer 10 Libra from Alice's account to Bob's account

Enter this command:

`libra% transfer 0 1 10`

* 0 is the index of Alice's account.
* 1 is the index of Bob's account.
* 10 is the number of Libra to transfer from Alice's account to Bob's account.

Sample output on success:

```bash
>> Transferring
Transaction submitted to validator
```

To query for transaction status, run:

`query txn_acc_seq 0 0 true`

You can use the command `query txn_acc_seq 0 0 true` (transaction by account and sequence number) to retrieve the information about the transaction you just submitted. The first parameter is the local index of the sender account and the second parameter is the sequence number of the account. To see a sample output of this command refer to [the Sample outputs - query txn_acc_seq](#query-txn_acc_seq).

You just submitted your transaction to a validator node on testnet and it was included in the [mempool](reference/glossary.md#mempool) of the validator. This doesn't necessarily mean your transaction has been executed. In theory, if the system was slow or overloaded, it would take some time to see the results and you may have to check multiple times by querying the accounts. To query an account with index 0, you can use the command  `query account_state 0.` The expected output is shown in the [Sample outputs - query account_state](#query-account_state) section

To troubleshoot the transfer command refer to [Troubleshooting - transfer command](#the-transfer-command).

The Blocking Transfer Command: You can use  the `transferb` command (as shown below), instead of the `transfer` command. `transferb` will submit the transaction and return to the client prompt only after the transaction has been committed to the blockchain. An example is shown below:

`libra% transferb 0 1 10`

Refer to [Life of a Transaction](life-of-a-transaction.md) for an understanding of the lifecycle of a transaction from submission to execution and storage.

### Query Sequence number After Transfer

```bash
libra% query sequence 0
>> Getting current sequence number
Sequence number is: 1
libra% query sequence 1
>> Getting current sequence number
Sequence number is: 0
```

The sequence number of 1 for Alice's account (index 0) indicates that one transaction has been sent from Alice's account so far. The sequence number of 0 for Bob's account (index 1) indicates that no transaction has been sent from Bob's account so far. Every time a transaction is sent from an account the sequence number is incremented by 1.

### Check The Balance in Both Accounts After Transfer

To check the final balance in both accounts, query the balance again for each account as you did in [this step](#step-3-check-the-balance). If your transaction (transfer) executed successfully you should see 100 Libra in Alice's account and 62 Libra in Bob's account.

```bash
libra% query balance 0
Balance is: 100
libra% query balance 1
Balance is: 62
```

### Congratulations!

You have successfully executed your transaction on the Libra testnet and transferred 10 Libra from Alice's account to Bob's account!

## Troubleshooting

### Setup

* Update Rust:
    * run `rustup update` from your libra directory
* Re-run setup script from your libra directory:
    * `setup/dev-setup.sh`

### Client Build and Run

If you are experiencing build failures, try to remove the cargo lock file from the libra directory:

* `rm Cargo.lock`

If your client did not connect to the testnet:

* Check your Internet connection.
* Ensure that you are using the latest version of the client. Pull the latest Libra Core and run the client again:
    * `cargo run -p client --bin client -- -a ac.stable.aws.hlw3truzy4ls.com -p 80`


### Minting and Adding Money to Account

* If the validator node you connected to on testnet is unavailable, you will get a “Server unavailable” message as shown below:

  ```bash
  libra% account mint 0 110
  >> Minting coins
  [ERROR] Error minting coins: Server unavailable, please retry and/or check **if** host passed to   client is running
  ```
* If your balance was not updated after submitting a transaction, wait a moment and query the balance again.  It may take a moment if the blockchain is experiencing a very high volume of transactions.  If your balance still is not updated, please try minting again.

* To check if an account exists, query the account state. For an account with index 0 enter this:

  `libra% query account_state 0`

### The Transfer Command

If the testnet validator node (your client was connected to) is unavailable, or your connection to testnet has timed-out, you will see this error:

```bash
libra% transfer 0 1 10
>> Transferring
[ERROR] Failed to perform transaction: Server unavailable, please retry and/or check if host passed to client is running
```
To troubleshoot transfer errors:

* Check the connection to testnet.
* Query the sender account to make sure it exists. Use the following command for an account with index 0:
    * `query account_state 0`
* You can try quitting the client using `quit` or `q!`  and run the following command again to connect to the testnet:
    * `cargo run -p client --bin client -- -a ac.stable.aws.hlw3truzy4ls.com -p 80`

## Sample Outputs

### query txn_acc_seq

```bash
libra% query txn_acc_seq 0 0 false
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

### Query account_state

```bash
libra% query account_state 0
>> Getting latest account state
Latest account state is:
 Account: 66e3667aee04a6326218c2e55055e7c7aba840c27e37d954a5ef5f0256b4e462
 Version: 126423
 State: Some(
    AccountStateBlob {
     Raw: 0x01000000210000000116936b87fea31a928a402fa0b57dce9d79c0c47e1a9188d67b3aa2b3d9e6a91a440000002000000066e3667aee04a6326218c2e55055e7c7aba840c27e37d954a5ef5f0256b4e462804a5d0500000000000000000000000002000000000000000200000000000000
     Decoded: Ok(
        AccountResource {
            balance: 90000000,
            sequence_number: 2,
            authentication_key: 0x66e3667aee04a6326218c2e55055e7c7aba840c27e37d954a5ef5f0256b4e462,
            sent_events_count: 2,
            received_events_count: 0,
        },
    )
     },
)
```

## Run A Local Validator Node

To start a validator node locally on your computer that creates its own blockchain network (not connected to the Libra testnet), change to the libra folder of your Libra Core installation and run libra_swarm as instructed below:

```bash
$ cd ~/libra
$ cargo run -p libra_swarm -- -s
```

`-p libra_swarm` - causes cargo to run the libra_swarm package which starts a local blockchain consisting of one node.

`-s` option starts a local client to connect to the local blockchain.

To see additional options for starting a node and connecting to the Libra Blockchain, run:

`$ cargo run -p libra_swarm -- -h`

The cargo run command may take a while to run. If the execution of this command completes without errors, an instance of the Libra CLI client and a Libra validator node is running on your system. Upon successful execution, you should see an output containing the CLI client menu and the `libra%` prompt.

## Life of a Transaction

Once you have executed your first transaction, you may refer to the document [Life of a Transaction](life-of-a-transaction.md) for:

* A look under the hood at the lifecycle of a transaction from submission to execution.
* An understanding of the interactions between each logical component of a Libra validator, as transactions get submitted and executed in the Libra ecosystem.

## Reference

* [Welcome page](welcome-to-libra.md).
* [Libra Protocol - Key Concepts](libra-protocol.md) - Introduces you to the fundamental concepts of the Libra protocol.
* [Getting Started With Move](move-overview.md) - Introduces you to a new blockchain programming language called Move.
* [Life of a Transaction](life-of-a-transaction.md) - Provides a look at what happens "under the hood" when a transaction is submitted and executed.
* [Libra Core Overview](libra-core-overview.md) - Provides the concept and implementation details of the Libra Core components through READMEs.
* [CLI Guide](reference/libra-cli.md) - Lists the commands (and their usage) of the Libra CLI client.
* [Libra Glossary](reference/glossary.md) - Provides a quick reference to Libra terminology.
