---
id: welcome-to-libra
title: Welcome
---

Welcome to the Libra developer site! The Libra Association’s mission is to enable a simple global payment system and financial infrastructure that empowers billions of people.

> The world truly needs a reliable digital currency and infrastructure that together can deliver on the promise of “the internet of money.” Securing your financial assets on your mobile device should be simple and intuitive. Moving money around globally should be as easy and cost-effective as — and even more safe and secure than — sending a text message or sharing a photo, no matter where you live, what you do, or how much you earn. - [Libra White Paper](https://libra.org/en-us/whitepaper)

The Libra payment system is built on a secure, scalable, and reliable blockchain. It is backed by a reserve of high-quality liquid assets comprising cash or ca​sh equivalents and very short-term government securities. This will help ensure that people and businesses have confidence that their Libra Coins can be converted into their local currency. It is governed by the Libra Association and its subsidiary Libra Networks, tasked with developing and operating the Libra network and the Libra project.

> The goal of the Libra Blockchain is to serve as a solid foundation for financial services, including a new global currency, which could meet the daily financial needs of billions of people. The blockchain has been built from the ground up to prioritize scalability, security, efficiency in storage and throughput, and future adaptability. — [Libra White Paper](https://libra.org/en-us/whitepaper)

This site documents the open-source implementation of the Libra protocol, which powers the Libra Blockchain. The site also documents Libra [testnet](https://developers.libra.org/docs/reference/glossary#testnet), a demonstration of this new system. In contrast to the forthcoming Libra mainnet, the testnet merely simulates a digital payment system and the coins on the testnet have _no real-world value_.

The documentation discusses:

- How to experiment with the prototype firsthand by [sending transactions](https://developers.libra.org/docs/my-first-transaction) to the testnet.
- Where to learn about new technology, such as the Libra protocol, the Move language, and the **Libra Byzantine Fault Tolerance (LibraBFT) consensus** protocol.
- How to be part of the community built around this new payment system.

<blockquote class="block_note">
Note: The Libra protocol and APIs are not final. One of the key tasks in evolving the prototype is formalizing the protocol and APIs. We welcome experimentation with the software on the testnet, but developers should expect that work may be required to publish applications using these APIs. As part of our <a href="https://libra.org/en-US/blog/">regular communication</a>, we will publish our progress towards stable APIs. You can also stay up to date on the latest developments by <a href="https://developers.libra.org/newsletter_form">signing up</a> for our developer newsletter.
</blockquote>

### Move: A new blockchain programming language

Move is a new programming language for implementing transaction logic and “smart contracts” on the Libra Blockchain. Because the goal of the Libra project is to one day serve billions of people, Move is designed with safety and security as the highest priorities.

Move takes insights from past security incidents with smart contracts and creates a language that makes it inherently easier to write code that fulfills the author’s intent. This lessens the risk of unintended bugs or security incidents. Specifically, Move is designed to prevent assets from being cloned. It enables “resource types” that constrain digital assets to the same properties as physical assets: a resource has a single owner, it can only be spent once, and the creation of new resources is restricted.

Move takes insights from past security incidents with smart contracts and creates a language that makes it inherently easier to write code that fulfills the author’s intent. This lessens the risk of unintended bugs or security incidents. Specifically, Move is designed to prevent assets from being cloned. It enables “resource types” that constrain digital assets to the same properties as physical assets: a resource has a single owner, it can only be spent once, and the creation of new resources is restricted.

Refer to [Getting Started With Move](https://developers.libra.org/docs/move-overview) for further information.

### BFT (Byzantine Fault Tolerance) consensus approach

The Libra payment system uses a BFT [consensus protocol](https://developers.libra.org/docs/reference/glossary#consensus-protocol) to form agreement among [validator nodes](https://developers.libra.org/docs/reference/glossary#validator-node) on the ledger of finalized transactions and their execution. The LibraBFT [consensus protocol](https://developers.libra.org/docs/reference/glossary#consensus-protocol) provides fault tolerance of up to one-third of malicious validators.

Each validator node maintains the history of all the transactions on the blockchain. Internally, a validator node needs to keep the current state to execute transactions and to calculate the next state. You can learn more about the logical components of a validator node in [Life of a Transaction](https://developers.libra.org/docs/life-of-a-transaction).

In addition to validator nodes, the Libra network will have full nodes that verify the history of the chain. The full nodes can serve queries about the blockchain state. They additionally constitute an external validation resource of the history of finalized transactions and their execution. They receive transactions from upstream nodes and then re-execute them locally (the same way a validator executes transactions.) Full nodes store results of re-execution to local storage. In doing so, full nodes will notice and can provide evidence if there is any attempt to rewrite history. This helps ensure that the validators are not colluding on arbitrary transaction execution.

### Testnet

The testnet is a publicly deployed instance of the Libra network that runs over a set of validator nodes and can be used to try the Libra payment system. You can also run validator nodes on the testnet using the Libra protocol. In contrast to the forthcoming Libra mainnet, the testnet merely simulates a digital payment system, and the coins on the testnet have no real-world value.

### Developers

The Libra project welcomes a wide variety of developers, ranging from people who contribute to Libra protocol to those who build applications that use the blockchain. The term “developer” encompasses all of these groups. Developers might:

- Build a local instance of the Libra network
- Build applications to interact with the Libra network
- Write smart contracts to execute on the blockchain
- Contribute to the Libra Blockchain software

### Getting Started

The Libra repo contains a command-line interface (CLI) for submitting transactions to the testnet. [My First Transaction](https://developers.libra.org/docs/my-first-transaction) guides you through executing your first transaction on the Libra Blockchain using the Libra CLI client. The CLI allows a participant to construct, sign, and submit transactions to a [validator node](https://developers.libra.org/docs/reference/glossary#validator-node). Similarly, it allows a participant to issue queries to the Libra Blockchain (through the validator node or a full node), request the status of a transaction or account, and verify the response.
