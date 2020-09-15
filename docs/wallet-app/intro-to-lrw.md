---
id: intro-to-lrw
title: 'Try the Local Wallet'
sidebar_label: Try the Local Web Wallet
---



The Libra Reference Wallet is meant to help developers learn how a wallet could work on the Libra Blockchain. Once you [set up and deploy the Reference Wallet locally](set-up-reference-wallet.md), you can test and understand the concepts behind wallet development on the blockchain. The goal of the reference wallet project is to help you determine how to implement, customize, and integrate your wallet on the Libra Payment Network.

We’ve also created a public, online demo version of the Libra Reference Wallet (the “Public Demo Wallet”). This [Public Demo Wallet](public-demo-wallet) does not have all the functionalities of the Libra Reference Wallet, and is only meant to provide a demonstration of basic wallet use cases on testnet.

The Libra Reference Wallet and Public Demo Wallet include various references to transacting in Libra Coins. All such transactions are simulations and these simulated Libra Coins can be deactivated by the Libra Association at any time. In addition, these simulated Libra Coins will not function, or in any way be usable or recognized, on mainnet.



>Note: *Custodial wallet services like holding Libra Coins for customers, exchanging one type of Libra Coin for another, transferring customer Libra Coins to other users (whether in the same wallet or others), and exchanging Libra Coins for cash all potentially money transmission or money services business activities, depending on the state/federal jurisdictions involved. 
>
>The functions described in this document may require the service provider to be licensed in the jurisdictions in which it operates and, to operate on the Libra Payment Network, it will need to be a Regulated VASP reviewed and onboarded by Libra Networks.

*Visit the [Prospective VASPs](/reference/compliance.md) page to learn more.*



### The lifecycle of a transaction

Before you get started with the Libra Reference Wallet, get familiar with how transactions are sent and received on the Libra Blockchain. 

When you submit a transaction to the Libra Payment Network, you are cryptographically signing a transaction script and then waiting (by listening to the event stream) for consensus from validators. The diagram below shows the flow of a transaction once it’s been submitted. Learn more about this flow [here](/core/life-of-a-transaction.md). 

![](/img/docs/validator.svg)





## Reference

* [Set Up](set-up-reference-wallet.md) - Learn how to deploy the Libra Reference Wallet.

* [Test the Local Web Wallet](try-local-web-wallet.md) - Test the local web version of the Libra Reference Wallet.

* [Try the Demo Wallet](public-demo-wallet.md) - Check out the demo wallet running on testnet. 

* [Wallet Architecture](wallet-arch.md) - Learn more about the different modules part of the wallet architecture.

* [Libra Coins Sourcing](liquidity.md) - Read about how Libra Coins are sourced.

  