---
id: libra-spec
title: Libra Specification
---

## Overview

The **Libra Protocol** implements a cryptographically authenticated database. This database is maintained by a distributed network of validators. The database must operate correctly even if a minority of the validators are disruptive, or have erroneous behavior. The validators collectively execute a [consensus protocol](https://fb.quip.com/W5zBAb9wLpIU#DOAACANu4M4) to agree on a total ordering of transactions. 

## Transactions and states

At the heart of the Libra Protocol are two fundamental concepts - t**ransactions** and **states**. A transaction changes the state of the blockchain. State is a snapshot of the global storage that persists the transactions in the Libra Blockchain. Executing a transaction is the **only** way to change the state of the blockchain. 

Figure 1.1 is a simplified representation of change of state of the blockchain, when a transaction is executed.

* **Sn-1** is the (n-1) th state of the blockchain. 
* **Tn** is the nth transaction. 
* **Sn** is the nth state of the blockchain. Sn is a function of Sn-1 and Tn.
* **F** is a deterministic function. F always returns the same final state, for a specific initial state, and a specific transaction. 
* If the state of the Libra Blockchain is Sn-1, and transaction Tn is executed on state Sn-1, the new state of the blockchain is **always** Sn.

[Image: 58763418_2940975029247701_8499255291076935680_n.jpg]
Figure 1.1 A transaction changes state.

## Transactions

(wip)
A transaction on the Libra Blockchain contains:

* Sender address - Account address of the sender of the transaction.
* Sender public key - The public key that corresponds to the private key used to sign the transaction.
* A Program - [Note to me: Explain in simple language]
* Gas price
* Maximum gas amount 
* Sequence number

The transaction script is an arbitrary program that encodes the logic of a transaction and interacts with resources published in the global storage of the Libra blockchain. To learn more about transactions and transaction scripts ????? 

For terminology and acronyms refer to the [Libra Glossary](https://fb.quip.com/LkbMAEBIVNbh).

## Validators

Clients of the Libra Blockchain create transactions, and submit them to a Validator. A **Validator** runs consensus (with other validators), executes the transaction, and stores it in the global storage of the blockchain. Validators decide which transactions will be added to the blockchain, and in which order. 

 A validator contains the following logical components:

* Admission Control
* Mempool
* Consensus
* Execution
* Virtual Machine
* Storage


[Image: Screen Shot 2019-04-29 at 1.49.18 PM.png]
Figure n.n Logical components of a validator.

## Admission Control (AC)

AC is the sole external interface to the  validator. Any incoming request from a client to the validator goes to AC  first. 

## Mempool

## Consensus

## Execution 

## Virtual Machine (VM)

The virtual machine is used to run the program included in a transaction and determine the results.

## Storage

All the data in the Libra Blockchain is stored in a single versioned database. The blockchain is represented as an ever-growing Merkle tree of transactions. A “leaf” is appended to the tree, for each transaction executed on the blockchain.

**Merkle accumulator **is an immutable, append-only**,** Merkle tree. Figure n.n shows how the Merkle accumulator grows as we append a new `TransactionInfo`` `object for each transaction executed.

* 0 - An empty accumulator is just a dummy node. 
* 1 - Every time a transaction is executed, a new `TransactionInfo` object is appended to the Merkle accumulator. 
* 2 - An internal node is calculated based on the leaf nodes.
* 3 - Any empty subtree is replaced by a dummy node. 
* 4, 5 - The Merkle accumulator grows as new transactions are appended to the ledger.

[Image: accumulator.png]Figure n.n  Merkle Accumulator

The structure of a TransactionInfo object:

1. pub struct TransactionInfo {
        signedTransactionHash: HashValue,
        stateRootHash: HashValue,
        eventRootHash: HashValue
    }


The **leaf** of the Merkle accumulator is the hash of:

* The `TransactionInfo` object.
* The root hash of the final state the accumulator (after the transaction is applied).
* And other metadata. 

Each **internal node** is the hash of its children.  When validators reach **consensus** on a new block of transactions:

* The validators append all the transactions in the block, one-by-one to the previous accumulator and compute the new root hash.
* All validators sign the root hash of the new tree.

Once a client obtains the signatures on the root hash, they can trust the root hash and verify any data that's part of the tree.

### Consistency Proof

With Merkle accumulators, it is very easy to verify that the latest state of the Libra Blockchain is consistent with a previous state. 
[Image: Screenshot 2019-02-28 10.40.22.png]Figure n.n Consistency Proof

Here is an example:
A validator node sleeps when the state (snapshot of the database) had 11 objects, and wakes up when the state had a million objects. To verify that the first 11 objects of the new state are the same as the 11 objects of the old state.

1. Break the old 11-object accumulator into three small full trees: 11 = 8 + 2 + The first tree has root `A`, the second tree has root `B,` and the third tree has just node `10`. 
2. Ask the server to send the root hashes of the three small trees. 
3. Verify that these three hashes match the old root hash, by combining them with two extra dummy nodes.
4. Ask the server to send Merkle proofs that show that `A`, `B,` and node `10` still exist in the new 1000000-object accumulator. 
5. This confirms that the 11 objects in the old state are exactly the first 11 objects in the new state of the accumulator. 

A client just needs the new root hash to verify any data that is part of the tree.

## Consensus Protocol

Our proposed consensus protocol, LibraBFT, is based on HotStuff. HotStuff is a  Byzantine fault-tolerant (BFT) consensus protocol. The design of LibraBFT is mostly independent of how validators interact with the clients of the Libra ecosystem. 

Transactions submitted by clients are first shared between validators, using a mempool protocol. Consensus leaders pull transactions from the mempool when they need to make a proposal.

[TBD]

## Event

An **event** is the user-facing representation of the effects of executing a transaction. For example, a peer to peer payment transaction emits a `SentPaymentEvent` for the sender and a `ReceivedPaymentEvent` for the recipient

[TBD]


[Next -> My First Transaction](https://fb.quip.com/0YgeAoka3KOy#ASHACA8ZGa4)
