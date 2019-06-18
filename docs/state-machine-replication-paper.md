---
id: state-machine-replication-paper
title: State Machine Replication in the Libra Blockchain
---

<!-- hide the table of contents --><style>.toc-headings {display: none !important; visibility: hidden !important;}</style>

## Abstract

This report presents LibraBFT, a robust and efficient state machine replication system designed for the Libra Blockchain. LibraBFT is based on HotStuff, a recent protocol that leverages several decades of scientific advances in Byzantine fault tolerance (BFT) and achieves the strong scalability and security properties required by internet settings. LibraBFT further refines the HotStuff protocol to introduce explicit liveness mechanisms and provides a concrete latency analysis. To drive the integration with the Libra Blockchain, this document provides specifications extracted from a fully-functional simulator. These specifications include state replication interfaces and a communication framework for data transfer and state synchronization among participants. Finally, this report provides a formal safety proof that induces criteria to detect misbehavior of BFT nodes, coupled with a simple reward and punishment mechanism.

### Downloads

[![State Machine Replication in the Libra Blockchain PDF Download](assets/illustrations/state-machine-pdf.png){: .download}](assets/papers/libra-consensus-state-machine-replication-in-the-libra-blockchain.pdf)
