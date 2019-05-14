---
id: life-of-a-transaction
title: Life of a Transaction
---

## Overview

Let's follow a transaction on its journey from submission to execution. A client creates and submits a signed transaction to a validator to transfer 10 Libras from Alice's account to Bob's account.

[Graphic: A version of the following figure]
[Image: image.png]

Figure n.n Transaction Submission Flow/[Or Another name]

## The Admission Control

[Image: Screen Shot 2019-04-30 at 9.27.25 AM.png]

1. The validator node's load balancer forwards the transaction to one of its admission control modules.
2. The selected admission control module accesses the virtual machine (VM) module of the node to perform preliminary checks to reject malformed transactions early.


LINK: [Admission Control module in Libra Core]

## The Virtual Machine (VM)

[Image: Screen Shot 2019-04-30 at 9.44.51 AM.png]

1. The VM loads information about the client's account from the storage.
2. The transaction is accepted if it has the the sender Alice's signature, the correct sequence number, and an appropriate amount of currency to pay for gas.
3. If the transaction passes the preliminary checks, it is sent to the node's mempool.

[Note to me: What else does VM do, add some details here, and that it will be covered later?]

In Libra Core the vm_validator crate/package [LINK to crate documentation] represents the virtual machine module of a validator node.

## The Mempool

(Graphic: Does this graphic provide a complete picture of Mempool?)
[Image: Screen Shot 2019-04-30 at 9.53.19 AM.png]
Mempool is a memory buffer, which holds transactions 'waiting' to be executed. 

1. When a new transaction is added, Mempool shares this transaction with other validator nodes in the system.
2. Transactions with high sequence numbers are held in the “parking lot” while the others are ordered.
3. The node loads its signing key, signs the transaction, and sends it back to the client.
4. The node aggregates the ordered transactions of its mempool into blocks and shares the blocks with the other nodes through the shared mempool.

In Libra Core the mempool crate/package [LINK to crate documentation] represents the mempool module of a validator node.

## The Consensus

(**Note to me**: Introduce BFT/HotStuff here?)
(Graphic: Need a version of this graphic)
[Image: Screen Shot 2019-04-30 at 11.07.59 AM.png]

1. The node attempts to reach consensus with other nodes to obtain an ordered sequence of blocks. This should be agreed and signed by at least 2f+1 nodes (the consensus majority).
2. **To reach consensus** with the other nodes:
    1. The node calls its VM to execute the smart contract.
    2. The VM loads the input resources and the smart contract from the storage.
    3. VM stores the output into its cache (scratchpad). VM output is not written to storage at this stage.
    4. The node now knows which transactions of the block execute correctly.????
    5. It removes from the block the transactions that do not execute correctly..
    6. At the end of the consensus, at least 2f + 1 nodes agree on:
        1. The committed block.
        2. Output of the execution ???

## The Storage

(Graphic: Need a version of the following graphic, without “secret service”.)
[Image: Screen Shot 2019-04-30 at 11.22.14 AM.png]

1. The node accesses the cache of the VM to load the output of the smart contract computed and updates the storage.
2. When the storage is updated, the sequence numbers of all resources (????) modified by the transaction are updated to the transaction's sequence number. The sequence number monotonically increases (never decreases) with each transaction. 
3. A transaction is executed only if it matches the next expected sequence number for the sender account. This helps sequence multiple transactions from the same sender, and prevents replay attacks.

It is important to understand how the sequence number of Alice's account and Bob's account change after 10 Libras are transferred. Let us assume the sequence number of Alice's account was p and the sequence number of Bob's account was m, before the transaction. [TBD]

[TBD::

* Talk about how transactions change states.
* How sequence numbers are incremented
* How a transaction is executed etc.
* The database/StateStore]


