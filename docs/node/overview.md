---
id: overview
title: Overview
sidebar_label: Node Operators
---

A Libra node is a peer entity that participates in the Libra payment network and tracks the state of the Libra Blockchain. Any interaction between a client (such as a wallet application) and the Libra Blockchain happens via these nodes.

The Libra network has two types of nodes:
* Validator Nodes
* Full Nodes

## Validator Nodes

When a wallet application submits a transaction to the Libra Blockchain, the validator node is used to validate the transaction as part of the consensus process of the Libra Blockchain. Validator nodes can only be run by Libra Association Members or operators hired by Association Members. Validator nodes also provide signatures that authenticate the current state of the Libra Blockchain.

## Full nodes

To retrieve information on the current state of the Libra Blockchain such as account balance, last transaction, and so on, a wallet application or client needs to send a read query to a full node. Anybody can run full nodes. Full nodes only validate transactions to synchronize to the Libra Blockchain. Full nodes rely on validator signatures to prove the correctness of their results to clients. They must also maintain historical information about the state of the blockchain.

If you’re interested in running a full node, subscribe to the developer newsletter for future announcements.

## Reference

<CardsWrapper>
  <CoreReference />
  <MerchantReference />
  <WalletReference />
  <MoveReference />
</CardsWrapper>
