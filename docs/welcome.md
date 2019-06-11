---
id: welcome
title: Welcome
---

## Overview

Welcome to the Libra developer site! Libra's mission is to enable a simple global currency and financial infrastructure that empowers billions of people.

Quoting from [the Libra white paper]():

_“The world truly needs a reliable digital currency and infrastructure that together can deliver on the promise of “the internet of money.” Securing your financial assets on your mobile device should be simple and intuitive. Moving money around globally should be as easy and cost-effective as — and even more safe and secure than — sending a text message or sharing a photo, no matter where you live, what you do, or how much you earn."_

Libra has a secure, scalable, and reliable **blockchain**. It is **backed by a reserve** of assets designed to give it intrinsic value. Libra is **governed by the independent Libra Association** tasked with evolving the ecosystem.

The goal of the Libra Blockchain is to serve as a solid foundation for financial services, including a new global currency, which could meet the daily financial needs of billions of people. The blockchain has been built from the ground up to prioritize scalability, security, efficiency in storage and throughput, and future adaptability

The Libra currency is built on the “Libra Blockchain.” The software that implements the Libra Blockchain is **open source**. Imagine an open interoperable ecosystem of financial services that developers and organizations will build to help people and businesses hold and transfer Libra for everyday use! 

## Move - A New Blockchain Programming Language

“Move” is a new programming language for implementing custom transaction logic and "smart contracts" on the Libra Blockchain. Because of Libra's goal to serve billions of people one day, Move is designed with safety and security as the highest priorities. 

Move takes insights from past security incidents with smart contracts and creates a language that makes it inherently easier to write code that fulfills the author's intent. This lessens the risk of unintended bugs or security incidents. Specifically, Move is designed to prevent assets from being cloned. It enables “resource types” that constrain digital assets to the same properties as physical assets: a resource has a single owner, it can only be spent once, and the creation of new resources is restricted. 

The Move language also facilitates automatic proofs that transactions satisfy a specific set of properties, such as, enforce that payment transactions only changing the account balances of the payer and receiver. By prioritizing these features, Move will help keep the Libra Blockchain secure. 

Move makes the development of critical transaction code easier. It enables the secure implementation of the Libra ecosystem's governance policies, such as the management of the Libra currency and the network of validator nodes. We anticipate that the ability for developers to create contracts will be available over time. This will support the evolution and validation of Move. 

Refer to [Getting Started With Move]() for further information.

## The Testnet

The **testnet** is a live demonstration of an early prototype of the Libra Blockchain software. This prototype implementation is called **Libra Core**. The Libra testnet is comprised of test [validator nodes](reference/glossary/#validator-node) running [Libra Core](reference/glossary/#libra-core). A **validator** is an entity of the Libra ecosystem that validates the Libra Blockchain. A validator maintains the history of all the transactions on the blockchain. Internally, a validator node needs to keep the current state, to execute transactions and to calculate the next state. We will learn more about the components of a validator in [Life Of A Transaction]().

The testnet is built for experimenting with new ideas without disturbing or breaking the main cryptocurrency software. In contrast to the forthcoming Libra [mainnet](reference/glossary/#mainnet), testnet has a digital currency _with no real world value_.

This project is at an early prototype stage. We want to know what you think. To learn more about the project goals and context, refer to the [Libra white paper](). 

## Libra Ecosystem

The Libra ecosystem consists of different types of entities:

* [Clients](#clients)
* [Validators](#validators)
* [Developers](#developers)

### Clients

A Libra client:

* Is a piece of software which has the capability to interact with the Libra Blockchain. 
* Can be run by the end-user, or on behalf of the end user (for example, for a Custodial client). 
* Allows the user to construct, sign, and submit transactions to a [validator](reference/glossary/#validator-node).
* Can issue queries to the Libra Blockchain (through the validator), request the status of a transaction or account, and verify the response. 

### Validators  

We have talked about validator nodes earlier in this document, validators decide which transactions will be added to the Libra Blockchain and in which order. Validators execute the transactions and add the results to the Libra Blockchain. 

### Developers

The Libra ecosystem supports a wide variety of developers, ranging from people who contribute to Libra Core to those who build applications that make use of the blockchain. The term developer encompasses all of these groups. Developers might:

* Build Libra clients.
* Build applications to interact with a Libra client.
* Write smart contracts to execute on the blockchain.
* Contribute to the Libra Blockchain software.

This site is targeted at developers.

## Contents Of This Site

* [Libra Protocol - Key Concepts](libra-protocol) - Introduces you to the fundamental concepts of the Libra protocol.
* [My First Transaction](my-first-transaction) - Guides you through executing your very first transaction on the Libra Blockchain using the Libra CLI client.
* [Getting Started With Move](move-getting-started) - Introduces you to a new blockchain programming language called Move.
* [Life Of A Transaction](life-of-a-transaction) - Provides a look at what happens under the hood when a transaction is submitted and executed.
* [Libra Core Overview](libra-core-overview) - Provides the concept and implementation details of the Libra Core components through READMEs.
* [CLI Guide](libra-cli) - Lists the commands (and their usage) of the Libra CLI client.
* [Libra Glossary](reference/glossary) - Provides a quick reference to Libra terminology.
* Open Source and Community Information.
* Libra technical papers.
