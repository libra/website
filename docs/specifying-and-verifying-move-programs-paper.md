---
id: specifying-and-verifying-move-programs-paper
title: Specifying and Verifying Move Programs
---

## Abstract

Move, the executable bytecode language of the Libra Blockchain [1](https://libra.org/en-us/whitepaper)[2](https://developers.libra.org/docs/the-libra-blockchainpaper), is designed with safety in mind [3](https://developers.libra.org/docs/move-paper). We have baked many important safety guarantees as possible into the language design, particularly in the bytecode verifier. But many important program-specific safety properties fall outside of this safety net. In this section, we will explain our proposed approach to specifying and enforcing these properties with formal verification. In contrast to the Move language – which has already been designed and implemented – the verification plan is a work in progress. This section reflects our current thinking.

Initially, Move modules will only be used to implement parts of the Libra Protocol itself, and it is our goal that these contracts will be formally specified and verified before use. However, this document is primarily concerned with the future, when third parties will write, publish, specify, verify, and audit contracts.

### Downloads

[![Specifying and Verifying Move Programs](assets/illustrations/verifying-move-programs-pdf.png){: .download}]()
