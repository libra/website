---
id: welcome-to-libra
title: Welcome
---

**Welcome to the Libra developer site!** Libra’s mission is to enable a simple global currency and financial infrastructure that empowers billions of people.

> The world truly needs a reliable digital currency and infrastructure that together can deliver on the promise of “the internet of money.” Securing your financial assets on your mobile device should be simple and intuitive. Moving money around globally should be as easy and cost-effective as — and even more safe and secure than — sending a text message or sharing a photo, no matter where you live, what you do, or how much you earn. — [Libra White Paper](https://libra.org/en-us/whitepaper)

Libra is built on a secure, scalable, and reliable blockchain. It is backed by a reserve of assets designed to give it intrinsic value and is governed by the independent Libra Association tasked with evolving the ecosystem.

> The goal of the Libra Blockchain is to serve as a solid foundation for financial services, including a new global currency, which could meet the daily financial needs of billions of people. The blockchain has been built from the ground up to prioritize scalability, security, efficiency in storage and throughput, and future adaptability. — [Libra White Paper](https://libra.org/en-us/whitepaper)

The Libra currency is built on the Libra Blockchain. This site documents Libra Core, an open source prototype of the Libra protocol, which powers this new blockchain. The site also documents the [testnet](reference/glossary.md#testnet), a demonstration of this new system. In contrast to the forthcoming Libra [mainnet](reference/glossary.md#mainnet), the testnet uses a digital currency _with no real-world value_.

The documentation discusses:

* How to experiment with the prototype first-hand by [sending transactions](my-first-transaction.md) to the testnet.
* Where to learn about new technology, such as the Libra protocol, the Move language, and LibraBFT.
* How to be part of the community built around this new ecosystem.

<blockquote class="block_note">

**Note:** This project is at an early prototype stage. The Libra protocol and Libra Core APIs are not final. One of the key tasks in evolving the prototype is formalizing the protocol and APIs. Currently, our focus is on the infrastructure and building the CLI client. A public API and associated libraries are on our immediate roadmap. We welcome experimentation with the software on the testnet, but developers should expect that work may be required to publish applications using these APIs. As part of our regular communication, we will publish our progress towards stable APIs.
</blockquote>

## Move: A New Blockchain Programming Language

“Move” is a new programming language for implementing custom transaction logic and "smart contracts" on the Libra Blockchain. Because of Libra’s goal to serve billions of people one day, Move is designed with safety and security as the highest priorities. 

Move takes insights from past security incidents with smart contracts and creates a language that makes it inherently easier to write code that fulfills the author’s intent. This lessens the risk of unintended bugs or security incidents. Specifically, Move is designed to prevent assets from being cloned. It enables “resource types” that constrain digital assets to the same properties as physical assets: a resource has a single owner, it can only be spent once, and the creation of new resources is restricted. 

Move makes the development of critical transaction code easier. It enables the secure implementation of the Libra ecosystem’s governance policies, such as the management of the Libra currency and the network of validator nodes. We anticipate that the ability for developers to create contracts will be available over time. This will support the evolution and validation of Move. 

Refer to [Getting Started With Move](move-overview.md) for further information.


## The Libra Ecosystem

The Libra ecosystem consists of different types of entities:

* [Clients](#clients)
* [Validator Nodes](#validator-nodes)
* [Developers](#developers)

### Clients

A Libra client:

* Is a piece of software that has the capability to interact with the Libra Blockchain. 
* Can be run by the end-user or on behalf of the end user (for example, for a custodial client). 
* Allows the user to construct, sign, and submit transactions to a [validator node](reference/glossary.md#validator-node).
* Can issue queries to the Libra Blockchain (through the validator node), request the status of a transaction or account, and verify the response. 

Libra Core contains a client, which can submit transactions to the testnet. [My First Transaction](my-first-transaction.md) guides you through executing your first transaction on the Libra Blockchain using the Libra CLI client.

### Validator Nodes  

[Validator nodes](reference/glossary.md#validator-node) are entities in the Libra ecosystem that collectively decide which transactions will be added to the Libra Blockchain. The validators use a [consensus protocol](reference/glossary.md#consensus-protocol) so that they can tolerate the presence of malicious validators. A validator node maintains the history of all the transactions on the blockchain. Internally, a validator node needs to keep the current state to execute transactions and to calculate the next state. We will learn more about the components of a validator node in [Life of a Transaction](life-of-a-transaction).

The testnet is a publicly available set of validator nodes, which can be used to try the system. You can also run validator nodes yourself using Libra Core.

### Developers

The Libra ecosystem supports a wide variety of developers, ranging from people who contribute to Libra Core to those who build applications that use the blockchain. The term “developer” encompasses all of these groups. Developers might:

* Build Libra clients.
* Build applications to interact with a Libra client.
* Write smart contracts to execute on the blockchain.
* Contribute to the Libra Blockchain software.

This site is intended for developers.

## Reference

* [Libra Protocol: Key Concepts](libra-protocol.md) &mdash; Introduces you to the fundamental concepts of the Libra protocol.
* [My First Transaction](my-first-transaction.md) &mdash; Guides you through executing your very first transaction on the Libra Blockchain using the Libra CLI client.
* [Getting Started With Move](move-overview.md) &mdash; Introduces you to a new blockchain programming language called Move.
* [Life of a Transaction](life-of-a-transaction.md) &mdash; Provides a look at what happens "under the hood" when a transaction is submitted and executed.
* [Libra Core Overview](libra-core-overview.md) &mdash; Provides the concept and implementation details of the Libra Core components through READMEs.
* [CLI Guide](reference/libra-cli.md) &mdash; Lists the commands of the Libra CLI client and their usage.
* [Libra Glossary](reference/glossary.md) &mdash; Provides a quick reference to Libra terminology.
