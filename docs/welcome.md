---
id: welcome
title: Welcome
---

## Overview

Welcome to the **Libra developer site**! Libra's mission is to enable a simple global currency and financial infrastructure that empowers billions of people.

Quoting from [the Libra white paper]():

_“The world truly needs a reliable digital currency and infrastructure that together can deliver on the promise of “the internet of money.” Securing your financial assets on your mobile device should be simple and intuitive. Moving money around globally should be as easy and cost-effective as — and even more safe and secure than — sending a text message or sharing a photo, no matter where you live, what you do, or how much you earn. New product innovation and additional entrants to the ecosystem will enable the lowering of barriers to access and cost of capital for everyone and facilitate frictionless payments for more people.
Libra is made up of three parts that will work together to create a more inclusive financial system:_

1. _It is built on a secure, scalable, and reliable **blockchain;**_
1. _It is **backed by a reserve** of assets designed to give it intrinsic value;_
1. _It is **governed by the independent Libra Association** tasked with evolving the ecosystem._

_The Libra currency is built on the “Libra Blockchain.” Because it is intended to address a global audience, the software that implements the Libra Blockchain is open source — designed so that anyone can build on it, and billions of people can depend on it for their financial needs. Imagine an open, interoperable ecosystem of financial services that developers and organizations will build to help people and businesses hold and transfer Libra for everyday use. With the proliferation of smartphones and wireless data, increasingly more people will be online and able to access Libra through these new services. To enable the Libra ecosystem to achieve this vision over time, the blockchain has been built from the ground up to prioritize scalability, security, efficiency in storage and throughput, and future adaptability.“_

_“The goal of the Libra Blockchain is to serve as a solid foundation for financial services, including a new global currency, which could meet the daily financial needs of billions of people. Through the process of evaluating existing options, we decided to build a new blockchain based on these three requirements:_

* _Able to scale to billions of accounts, which requires high transaction throughput, low latency, and an efficient, high-capacity storage system._
* _Highly secure, to ensure safety of funds and financial data._
* _Flexible, so it can power the Libra ecosystem's governance as well as future innovation in financial services._

_The Libra Blockchain is designed from the ground up to holistically address these requirements and build on the learnings from existing projects and research — a combination of innovative approaches and well-understood techniques.“_

For further information on the Libra Blockchain refer to the [Libra Blockchain paper]().

## Move - A New Blockchain Programming Language

As described in the Libra white paper:

_““Move” is a new programming language for implementing custom transaction logic and "smart contracts" on the Libra Blockchain. Because of Libra's goal to one day serve billions of people, Move is designed with safety and security as the highest priorities. Move takes insights from security incidents that have happened with smart contracts to date and creates a language that makes it inherently easier to write code that fulfills the author's intent, thereby lessening the risk of unintended bugs or security incidents. Specifically, Move is designed to prevent assets from being cloned. It enables “resource types” that constrain digital assets to the same properties as physical assets: a resource has a single owner, it can only be spent once, and the creation of new resources is restricted._ 

_The Move language also facilitates automatic proofs that transactions satisfy certain properties, such as payment transactions only changing the account balances of the payer and receiver. By prioritizing these features, Move will help keep the Libra Blockchain secure. By making the development of critical transaction code easier, Move enables the secure implementation of the Libra ecosystem's governance policies, such as the management of the Libra currency and the network of validator nodes. Move will accelerate the evolution of the Libra Blockchain protocol and any financial innovations built on top of it. We anticipate that the ability for developers to create contracts will be opened up over time in order to support the evolution and validation of Move. Refer to [Getting Started With Move]() for further information."_

## The Testnet

We just launched the **testnet**, a live demonstration of an early prototype of the Libra Blockchain software, also known as **Libra Core**. The Libra testnet is comprised of test [validator nodes](reference/glossary/#validator-node) running [Libra Core](reference/glossary/#libra-core), the software which maintains the Libra cryptocurrency. A **validator** is an entity of the Libra ecosystem that validates the Libra Blockchain. A validator maintains the history of all the transactions on the blockchain. Internally, a validator node needs to keep the current state, to execute transactions and to calculate the next state. We will learn more about the components of a validator in [Life Of A Transaction]().

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

## The Structure Of This Site

The Libra developer site provides a technical walk-through of the Libra ecosystem, it:

* Introduces you to the Libra Protocol [Libra Protocol](libra-protocol)
* Provides abstracts of the Libra technical papers and links you to the latest copy of the papers.
* Guides you through executing your very first transaction on the Libra Blockchain - [My First Transaction](my-first-transaction)
* Provides a look at what happens under the hood when a transaction is submitted and executed - [Life Of A Transaction](life-of-a-transaction)
* Introduces you to a new blockchain programming language called [Getting Started With Move](move-getting-started).
* Provides the concept and implementation details of the Libra Core components and the associated API documentation - [Libra Core Overview](libra-core-overview)
* Includes a [CLI Guide](libra-cli), which lists the commands (and their usage) to help you connect to the testnet through a CLI client, and interact with the Libra Blockchain.
* Includes a [Libra Glossary](reference/glossary) for a quick reference to Libra terminology.
