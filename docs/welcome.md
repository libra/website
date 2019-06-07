---
id: welcome
title: Welcome
---

## Overview

Welcome to the **Libra ecosystem**! The Libra mission is to create: 

**“A simple, borderless, global currency, and financial ecosystem that empowers billions of people.”**

We just launched the **testnet,** a live demonstration of an early prototype of the Libra Blockchain software, also known as **Libra Core**. The Libra testnet is comprised of test [validator nodes](#validatornodes) running [Libra Core](#LibraCore), the software which maintains the Libra cryptocurrency. The testnet is built for experimenting with new ideas without disturbing or breaking the main cryptocurrency software. In contrast to the forthcoming Libra [mainnet](#mainnet), testnet has a digital currency _with no real world value_.

This project is at an early prototype stage. We want to know what you think. To learn more about the project goals and context, refer to the [Libra white-paper](). 

The Libra developer site provides a technical walk-through of the Libra project, it:

* Introduces you to the Libra Protocol [Libra Protocol](https://fb.quip.com/W5zBAb9wLpIU)
* Provides abstracts of the Libra technical papers and links you to the latest copy of the papers - [Libra Technical Papers]().
* Guides you through executing your very first transaction on the Libra Blockchain - [My First Transaction]()
* Provides a look at what happens under the hood when a transaction is submitted and executed - [Life of a Transaction]()
* Introduces you to a new blockchain programming language called Move - [Move - Getting Started]()
* Provides the concept and implementation details of the Libra Core components and the associated API documentation - [Libra Core - Overview]()
* Includes a [CLI Guide](), which lists the commands (and their usage) to help you connect to the testnet through a CLI client, and interact with the Libra Blockchain.
* Includes a [Libra Glossary]() for a quick reference to Libra terminology.

### Libra

**Libra** is the reserve-backed global currency at the heart of the Libra project. The **Libra Blockchain** is a globally accessible decentralized software system for managing the Libra ledger. The blockchain is the primary motivation for creating the Libra Core software. 

### Libra ecosystem

The entities of the Libra ecosystem are:

* [Clients](#clients)
* [Validators](#validators)
* [Developers](#developers)
* [End-Users](#end-users)

### Clients

A Libra client:

* Is a piece of software which has the capability to interact with the Libra Blockchain. 
* Can be run by the end-user, or on behalf of the end user (for example, for a Custodial client). 
* Allows the user to construct, sign, and submit transactions to a [validator]().
* Can issue queries to the Libra Blockchain (through the validator), request the status of a transaction or account, and verify the response. 

### Validators  

Validators decide which transactions will be added to the Libra Blockchain and in which order. Validators execute the transactions and add the results to the Libra Blockchain. 

### Developers

* Contribute to the Libra Blockchain software.
* Write software to interact with the Libra Blockchain.

### End-Users 

End-users may use clients to:

* Construct and submit transactions to the Libra Blockchain.
* Read information about accounts and transactions from the Libra Blockchain.

### Move

Move is a new programming language that was developed to provide a safe and programmable foundation for the Libra Blockchain. Move is used to implement core parts of the platform such as customizable transactions, the Libra currency, and the Libra governance rules. For more information, take a look at [Move - Getting Started]().

Third-party developers can use Move to write custom transactions and smart contracts on the Libra Blockchain. These features are not yet enabled in the public testnet, but we explain how you can experiment with them locally in [Move - Under the Hood]()
