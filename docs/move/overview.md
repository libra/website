---
id: overview
title: Overview
sidebar_label: Move
---

Welcome to Move, a programming language for implementing custom transaction logic and “smart contracts” on the Libra Blockchain. Move allows developers to write programs that flexibly manage and transfer assets, while providing the security and protections against attacks on those assets.

Move takes its cue from [Rust](https://www.rust-lang.org/) by using resource types with move (hence the name) semantics as an explicit representation of digital assets, such as currency.

![Figure 1.1 Move Methods](/img/docs/move-methods.svg)
<small className="figure">Figure 1.1 Move Methods</small>

## Who is Move for?

Move was designed and created as the programming language for the Libra network. That said, there are two items to note. First, the Libra network mainnet has not yet launched, so Move is still evolving. Second, Move can be used as language for [other blockchain platforms](https://github.com/co-move/comove) (even non-blockchain uses as well).

Given custom Move modules will not be supported at [launch](https://libra.org/white-paper/#whats-next), we are targeting an early Move Developer persona.


The early Move Developer is one with some programming experience, who wants to begin understanding the core programming language used to implement custom transaction logic and smart contracts for the Libra Blockchain.

### Hobbyists

Understanding that the capability to create custom modules on the Libra network will not be available at launch, the hobbyist Move Developer is interested in learning the intricacies of the language. She will understand the basic syntax, the standard libraries available, and write example code that can be executed on local Libra nodes. The Move Developer may even want to dig into understanding how the Move Virtual Machine executes the code she writes.

### Core Contributor

Beyond a hobbyist wanting to stay ahead of the curve for the core programming language is someone who may want to contribute directly to Move. Whether this includes submitting language improvements or even adding core modules available on the Libra networkPlatform, the core contributor will understand Move at a deep level. Once familiar with Move, the core contributor may want to submit a request to the Libra Association to add new transaction or module types, via the [Libra Improvement Protocol (LIP) process](https://lip.libra.org/).

### Who Move is currently not targeting

Currently, Move is not targeting developers who wish to create custom modules and contracts for use on mainnet. We are also not targeting novice developers who expect a completely polished developer experience even in testing the language.

## Move Architecture

Move has all of the syntax and semantics you would expect from a first-class programming language. However, there is an entire architecture dedicated to creating, using, and executing code based on Move. The diagram below shows the architecture of Move as it pertains to the Libra payment system, from using the source language to script execution. Click on a specific topic of the diagram to be taken to more information about that specific area.

<img src="/img/docs/move-arc-1.svg" />
<img className="gapless-image" src="/img/docs/move-arc-2.svg" />
<img className="gapless-image" src="/img/docs/move-arc-3.svg" />
<img className="gapless-image" src="/img/docs/move-arc-4.svg" />
<img className="gapless-image" src="/img/docs/move-arc-5.svg" />
<small className="figure">Figure 1.2 Move Architecture</small>

## Reference

<CardsWrapper>
  <CoreReference />
  <MerchantReference />
  <WalletReference />
  <NodeReference />
</CardsWrapper>
