---
id: libra-cli
title: Libra CLI
---

### Synopsis

```rust
cargo run -p client --bin client -- [-a host] [-p port] [-f accounts] [-d debug_port]

```

### Description

Libra CLI (client) is the user interface (interactive shell) to interact with Libra chain. It provides basic command for user to create account/mint coin/transfer as well as query the block chain. It can be used to interact with any chain by specifying validator destination (including Libra Testnet and chains run by different users).

The following options are available:

* **-a** | **—-host**, Specify the destination host for CLI to connect with, default value is 'localhost'.
* **-p** | **-—port**, Specify the destination port (public port of destination Libra chain) for CLI to connect with, default value is 30307.
* **-f** | **—-accounts**, Load accounts from file, which is saved from previous session, during startup.
* **-d** | **--debug_port**, Specify the debug port of the destination Libra chain for CLI to connect with, default value is 50303. Default port is used to retrieve debug information, e.g. counters from validator.

### Invocation

CLI is invoked as an interactive shell. A user can enter commands to interact with the Libra Blockchain.

### Command

CLI command is in the following format:

```rust
major_command sub_command [options]
```

Enter major command only will show the help information under this major command. Major commands is one of the following:

* **account** | **a**, account related operations. Sub commands include: 
    * **create** | **c**,  Create a random account with private/public key pair. Account information will be held in memory only. The created account will not be saved to chain.
    * **save** | **s**, Save all accounts information, including new created ones, to file.
    * **load** | **l**, Load accounts from file.
    * **list** | **la**, Print all accounts that were created or loaded
    * **<mint | m>** | **<mintb| mb>**, Mint coins to the account. Suffix 'b' is for blocking. 
        * Usage:  mint|mint|m|b <account_address_to>|<account_ref_id_to> <mint_balance>. If blocking is specified (using suffix 'b'), CLI will query chain until the transaction is finalized/available (Same in other sub commands).
        * Arguments:
            * account_address|account_reference_id, the receiver account to mint the coins to. If the receiver account does not exist, it will be created first. Either account_address or account_ref_id (internal index of account in CLI) can be used to specify receiver account (same in other sub commands). The account sent this mint transaction (currently preloaded genesis account) pays for the gas.
            * mint_balance, the balance of coin minted to the receiver account.
* **transfer** | **transferb** | **t** | **tb**, Transfer coins from account to another. Suffix 'b' is for blocking. 
    * Usage: transfer | transferb | t | tb <sender_account_address>|<sender_account_ref_id> <receiver_account_address>|<receiver_account_ref_id> <number_of_coins>
    * Arguments:
        * sender_account_address | sender_account_ref_id, the account to send this transfer transaction. The sender account pays the gas.
        * receive_account_address | receiver_account_ref_id, the account to which this transaction sends coins. If the receiver account does not exist, it will be created first and sender will pay the gas for both account creation and coin transfer.
        * number_of_coins, the number of coins transferred to receiver account.
* **query** | **q**, query data from destination chain. All query operations are blocking. Sub commands include: 
    * **balance** | **b**     Get the current balance of an account
        * Usage: balance | b <account_ref_id>|<account_address>
        * Arguments:
            * account_ref_id|account_address, the account to query balance for.
            * assert_balance | a    Assert that balance is equal to the specified value, CLI will panic if the value from storage does not equal to expected value.
        * Usage: assert_balance | a <account_ref_id>|<account_address> <expected_value>
        * Arguments:
            * account_ref_id | account_address, the account to assert balance.
            * expected_value, expected value to assert to.
    * **sequence** | **s**    Get the current sequence number for an account.
        * Usage: sequence | s <account_ref_id>|<account_address>. 
        * Arguments:
            * <account_ref_id>|<account_address> the account to get current/latest sequence number.
    * **account_state** | **as**   Get the latest state for an account. 
        * Usage: account_state | as <account_ref_id>|<account_address>.
        * Arguments:
            * account_ref_id | account_address, the account to query latest state.
    * **txn_acc_seq** | **ts**     Get the committed transaction by account and sequence number.
        * Usage: txn_acc_seq | ts <account_ref_id>|<account_address> <sequence_number>
        * Arguments:
            * account_ref_id | account_address, the account to query committed transaction.
            * sequence_number, the sequence number of committed transaction.
    * **txn_range** | **tr**    Get the committed transaction by range
        * Usage: txn_range | tr <start_version> <limit>
        * Arguments:
            * start_version, the version to query the transaction from.
            * limit, the maximal number of transactions to query. 
    * **event** | **ev**    Get event by account and path.
        * Usage: event | ev <account_ref_id>|<account_address> <path> <star_sequence_number> <ascending> <limit>.
        * Arguments:
            * account_ref_id | account_address, the account to query events.
            * path, the path of the events to query.
            * star_sequence_number, the sequence number of event to query from.
            * ascending, the direction of query from star_sequence_number.
            * limit, the maximal number of events to query.
* **quit** | **q!**, exit the CLI. No sub command is required.
* **help** | **h**, prints help. No sub command is required.
* **debug** | **d**, retrieve debug information. Sub commands include: 
    * **metrics** | **metrics?** | **m** | **m?**,  Print node metrics. (? for json output)
    * **dump** | **d**, Dump node heap profile

### Account Creation/Mint(Faucet) for testnet

Currently, account creation provided by CLI only creates account information but not send it to chain. VM provides a couple options to create account on chain:

* Explicitly send create account transaction, sender needs to pay gas.
* Transfer coins to a non-existing account. The receiver account will be created first and then coins will be transferred. The sender pays for both account creation and transfer.
* Send mint transaction to mint coin to a non-existing account. Account will be created first and coins will be minted later. Unlike other transactions, a non-existing account itself can send mint transaction to mint coins to itself. The gas will be deducted from balance to mint. In this case, if sender does not specify enough mint balance, the transaction will fail. For test net, there is NO explicit limit for how much coin an account can mint. It will be the major approach that users create coin to play with. 

Proposed change to current CLI sub commands:

* Extend `list_account` sub command to also show genesis account (now only shows normal account) information available in CLI. So users can use genesis account explicitly for different transactions, e.g. transfer. 
* Change mint sub command usage to eliminate implicit assumption that genesis account should be always used for mint:

```
mint|mint|m|b <sender_account_address>|<sender_account_ref_id>
    <account_address_to>|<account_ref_id_to> <mint_balance>
```



