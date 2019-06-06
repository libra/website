---
id: my-first-transaction
title: My First Transaction
---

> Under development...

## Overview

To get familiar with the Libra Protocol, let us first run a transaction on the Libra Blockchain. In the document - [Life of a Transaction](https://fb.quip.com/NQc6AXFKc3go), we will dig a little deeper to understand the technical details of what happens under the covers.

## The Scenario

** Alice pays Bob 10 Libra. **

## **Prerequisites**

Before we create and submit a transaction on the Libra blockchain, let us perform some prerequisite steps.

1. Download and Install Libra Core
2. Create Accounts
3. Add Libra
4. View Accounts

### Download and install Libra Core

To download and install Libra Core (the prototype implementation of Libra Protocol), follow the instructions on the LINK: [Get Started] page to set up your development environment.

### Create Accounts

To create Alice's and Bob's account

* First run the client binary. Refer to [Run CLI Client: Libra Guides - Libra CLI (wip)](https://fb.quip.com/7UiFAHF5mNlb#EGBACAXrKQ1) 
* Type “account” to see the list of all account tasks.
* Type “account create” to create a new key-pair for Alice's account.  This will return the address of the account and an index. The index can be used in other commands.  
* Here is a sample output:
* Creating random account
    Created account #1 address 422803560534323a3c250b57352e4826113f134615452d27191a1b471d591f54
    
* To create Bob's account, repeat the steps for account creation. For further information on Accounts, refer to [Libra Accounts](https://fb.quip.com/eZFaAGctl2tE).

### Add Libra to Alice and Bob's account

To add money to  Alice's and Bob's account.

* [Steps here]
* [Use Faucet to mint and load some coins??]

### View Balance

To see the balance in Alice's and Bob's account:

* Run the client binary: [Run CLI Client: Libra Guides - Libra CLI (wip)](https://fb.quip.com/7UiFAHF5mNlb#EGBACAXrKQ1)
* Type “query” to see a list of all query operations.
* Type “query balance <account index>”, where account index is the index of the saved account.

## My First Transaction

We have created Alice's and Bob's accounts, and added money to each account. Now we we will:

1. Connect to TestNet.
2. Create a transaction to transfer 10 Libra from Alice's account to Bob's account.
3. Execute the transaction on the Libra blockchain.

### Connect to TestNet

To connect to TestNet:
????
kph: Perhaps hardcoded addresses or perhaps discovery.

When you connect to TestNet, the following steps happen automatically:

* A validator is discovered
* What else??
* (A reference to the validator/its public key? is returned???)

### Create and submit a transaction

Get Started
TBD
Create a signature
TBD
Write a transaction script
TBD
Submit the transaction to the validator
TBD

### View Balance

To confirm that the transaction executed successfully, let us view Alice's and Bob's accounts. To view the final balance in each account follow the instructions in [View Balance](https://fb.quip.com/sIrOAbc770Kq#cXKACAYODbg)

If you completed the steps successfully, **congratulations**! you have just executed your first transaction on the TestNet.

Next ->[](https://fb.quip.com/0YgeAoka3KOy#ASHACA7BdIX)[Life of a Transaction](https://fb.quip.com/NQc6AXFKc3go)
