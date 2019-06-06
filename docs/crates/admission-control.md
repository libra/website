---
id: admission-control
title: Admission Control
---

Admission Control (AC) is the public API end point taking public gRPC requests from clients.

## Overview

Admission Control (AC) serves two types of request from clients:

1. SubmitTransaction, to submit transaction to associated validator.
2. UpdateToLatestLedgerAndGetProofs, to query storage, e.g. account state, transaction log, etc.

## Implementation Details

Admission Control (AC) implements two public APIs:

1. SubmitTransaction(SubmitTransactionRequest)
    * Multiple validations will be performed against the request:
	   * Transaction signature will be checked first. If the check fails, AdmissionControlStatus::Rejected will be returned to client.
	   * Transaction will be then validated by vm_validator. If it fails, corresponding VMStatus will be returned to client.
	* Once all validations are passed, AC will query account balance and latest sequence number from storage and
	send them along with the client request to Mempool.
    * If Mempool returns MempoolAddTransactionStatus::Valid, AdmissionControlStatus::Accepted will be returned to
    client indicating successful submission. Otherwise, corresponding AdmissionControlStatus will be returned to client.
2. UpdateToLatestLedgerAndGetProofs(UpdateToLatestLedgerAndGetProofsRequest). No extra processing is performed in AC.
The request is directly passed to storage for query.

## Folder Structure
    .
    └── src
        ├── admission_control_node.rs           # Wrapper to run AC in a separate thread
        ├── admission_control_service.rs        # gRPC service and main logic
        ├── main.rs                             # Main entry to run AC as a binary                              
        ├── proto                               # Protobuf definitions
        └── unit_tests                          # Tests


## This module interacts with
Mempool module to submit transactions from clients.
Storage module to query validator storage.

## Contributions

## License
