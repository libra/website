---
id: state-machine-replication-paper
title: State Machine Replication in the Libra Blockchain
---

<!-- hide the table of contents --><style>.toc-headings {display: none !important; visibility: hidden !important;}</style>

_**Note to readers:** This information was published before the Association released White Paper v2.0, which includes a number of key updates to the Libra payment system. This information has not been modified to incorporate those updates and should be read in that context._

## Abstract

This report describes the algorithmic core of LibraBFT, named LBFT, and discusses next steps in its production. The consensus protocol is responsible for ordering and finalizing transactions. LBFT decentralizes trust among a dynamically reconfigurable set of validators, and remains safe against network asynchrony and even if at any particular configuration epoch, a threshold of the participants are Byzantine.

LBFT is based on HotStuff, a recent protocol that leverages several decades of scientific advances in Byzantine fault tolerance (BFT) and achieves the strong scalability and security properties required by internet settings. Several novel features distinguish LBFT from HotStuff. LBFT incorporates a novel round synchronization mechanism that provides bounded commit latency under synchrony. It introduces a nil-block vote that allows proposals to commit despite having faulty leaders. It encapsulates the correct
behavior by participants in a separable trust zone module, allowing it to run within a secure hardware enclave that reduces the attack surface on participants.

LBFT can reconfigure itself, by embedding configuration-change commands in the sequence. A new configuration epoch may change everything from the validator set to the protocol itself.

### Downloads

[![State Machine Replication in the Libra Blockchain PDF Download](assets/illustrations/state-machine-pdf.png){: .download}](assets/papers/libra-consensus-state-machine-replication-in-the-libra-blockchain/2020-04-09.pdf)

<a href="/papers">Previous versions</a>
