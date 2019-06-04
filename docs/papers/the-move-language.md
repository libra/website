---
id: the-move-language
title: Move: a Language for Managing Access to Scarce Resources
---

## Abstract

We present *Move*, a new programming language created to support the Libra Blockchain protocol. Move is an executable bytecode language used to implement transactions and smart contracts. The key feature of Move is the ability to define custom linear [Jean-Yves Girard. [Linear logic](https://dl.acm.org/citation.cfm?id=35357). 1987] resource types. Resource types are used to encode programmable assets that behave like ordinary program values: resources can be stored in data structures, passed as arguments to procedures, and so on. However, the Move type system provides special safety guarantees for resources. A resource can never be copied, only moved between program storage locations. These guarantees are enforced statically by the Move Virtual Machine. This allows us to implement Libra coin itself as an ordinary resource type in the Move language (in contrast to Ether and Bitcoin, which have special status in their respective languages).

[Download Paper]()
