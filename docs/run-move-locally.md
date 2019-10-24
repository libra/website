---
id: run-move-locally
title: Run Move Programs Locally
---
<blockquote class="block_note">

**Note:** Currently, you can run custom Move modules and scripts on a local network only, and not on the Libra testnet.
</blockquote>

This tutorial guides you through publishing a Move module and executing a Move transaction script on a local blockchain. To perform operations that are not natively supported by the existing Move transaction scripts, you can create and publish Move modules and write scripts to use these modules. For basic information on Move, refer to [Getting Started with Move](move-overview.md). For deeper technical understanding of Move, refer to the [technical paper](move-paper.md). For guidance on running a local network of nodes, refer to [Run a Local Network](run-local-network.md). The Libra CLI client provides the `dev` command to compile, publish, and execute Move programs locally. Refer to the [CLI Guide - dev command](reference/libra-cli#dev-d-mdash-operations-related-to-move-transaction-scripts-and-modules) for command usage. To see the list of subcommands,  enter `dev` on the CLI.

To create, compile, and publish Move modules to an account on the local blockchain, follow the instructions in [compile and publish Move modules](#compile-and-publish-move-modules). To compile and execute a Move transaction script, follow the instructions in [compile and execute transaction scripts](#compile-and-execute-transaction-scripts).

## Compile and Publish Move Modules

### Create Move Module

Let’s start with an extremely simple module called `MyModule`. This module has a single procedure called `id`, which is an identity function for coins. It takes a `LibraCoin.T` resource as input and hands it back to the calling program. The Move Intermediate Representation (IR) code for this module is provided below, save it in a file named `my_module.mvir.`

```
module MyModule {
  import 0x0.LibraCoin;

  // The identity function for coins: takes a LibraCoin.T as input and hands it back
  public id(c: LibraCoin.T): LibraCoin.T {
    return move(c);
  }
}
```

### Start a Local Network of Validator Nodes

To run a local network with one validator node and create a local blockchain, change to the `libra` directory and run `libra-swarm`, as shown below:

```
$ cd libra
$ cargo run -p libra-swarm -- -s
```

This command will take some time to run and it will perform the following actions:

* Spawn a local network with one validator node on your computer.
* Generate genesis transaction, mint key, and bootstrap configuration of the node.
* Start an instance of the Libra CLI client; the client is connected to the local network.

Upon successful execution of the command, you'll see the CLI client menu and the `libra%` prompt as shown below:

```
usage: <command> <args>

Use the following commands:

account | a
Account operations
query | q
Query operations
transfer | transferb | t | tb
<sender_account_address>|<sender_account_ref_id> <receiver_account_address>|<receiver_account_ref_id> <number_of_coins> [gas_unit_price_in_micro_libras (default=0)] [max_gas_amount_in_micro_libras (default 100000)] Suffix 'b' is for blocking.
Transfer coins (in libra) from account to another.
dev
Local Move development
help | h
Prints this help
quit | q!
Exit this client


Please, input commands:

libra%
```

For detailed instructions on working with a local cluster of validator nodes, refer to [Run a Local Network](run-local-network.md).

### Create an Account

Each Move module and resource type is hosted by a specific account address. For example, `LibraCoin` module is hosted by the account at address `0x0`. To import the `LibraCoin` module in other modules or transaction scripts, you would use `import 0x0.LibraCoin`.

To host `MyModule`, create an account:

```
libra% account create
>> Creating/retrieving next account from wallet
Created/retrieved account #0 address 810abcc08dbed34ea15d7eb261b8001da6a62d72acdbf87714dd243a175f9b62

```

In the above output, 0 is the index of the account you just created, and the hex string is the address of that account. The index is just a convenient way to refer to this account locally, and it's also called `ref_id`. For more information on account creation, refer to [My First Transaction](my-first-transaction.md).

The `create` command generates a local keypair. To create the account on the local blockchain, you'll need to mint money into the account, as shown below:

```
libra% account mintb 0 76
>> Minting coins
waiting ....transaction is stored!
Finished minting!
```
To check whether the account was successfully created on the local blockchain, query the account balance. Note that the account balance you see in the output is in libra.

```
libra% query balance 0
Balance is: 76.000000
```

### Compile Move Module

To compile `my_module.mvir`, use the [dev compile](reference/libra-cli#dev-d-mdash-operations-related-to-move-transaction-scripts-and-modules) command.

```
libra% dev compile 0 <path to my_module.mvir> module
```
* 0 &mdash; Index/ref_id of the account that the module will be published under.
* `module` &mdash; Indicates that you are compiling a Move module. If you were compiling a transaction script, you would use `script` instead.

Move IR gets fed into the IR compiler in a `.mvir` file and the compiler outputs the corresponding bytecode file. When you are ready to publish this module into an account on the blockchain,  use this bytecode file and not the `.mvir` file.

After the module is successfully compiled, you'll see the following message in the output, it contains the path to the bytecode file produced by compiling `my_module.mvir`.

```
Successfully compiled a program at /var/folders/tq/8gxrrmhx16376zxd5r4h9hhn_x1zq3/T/.tmpigAZCx
```

If you would like to save the bytecode file in a specific path, instead of a temporary path, you can specify it as an argument to the [dev compile](reference/libra-cli#dev-d-mdash-operations-related-to-move-transaction-scripts-and-modules) command.

### Publish Compiled Module

To publish the module bytecode on your local blockchain, run the [dev publish](reference/libra-cli#dev-d-mdash-operations-related-to-move-transaction-scripts-and-modules) command and use the path to the compiled module bytecode file as shown below:

```
libra% dev publish 0 /var/folders/tq/8gxrrmhx16376zxd5r4h9hhn_x1zq3/T/.tmpigAZCx

waiting .....transaction is stored!
no events emitted.
Successfully published module
```
Upon successful execution of the `dev publish` command, the bytecode for `MyModule` is published under the sender’s account. To use the procedures and types declared in `MyModule`, other transaction scripts and modules can import it using `import <sender_address>.MyModule`.

 Subsequent modules published under `<sender_address>` must not be named `MyModule`. Each account may hold at most one module with a given name. Attempting to publish a second module named `MyModule` under `<sender_address>` will result in a failed transaction.

## Compile and Execute Transaction Scripts

### Create Transaction Script

<blockquote class="block_note">

**Note**: You'll find samples of transaction scripts in the [libra/language/stdlib/transaction_scripts](https://github.com/libra/libra/tree/master/language/stdlib/transaction_scripts) directory.
</blockquote>

Now let’s write the following script to use `MyModule` and save it as `custom_script.mvir`:

```
import 0x0.LibraAccount;
import 0x0.LibraCoin;
import {{sender}}.MyModule;

main(amount: u64) {
  let coin: LibraCoin.T;
  coin = LibraAccount.withdraw_from_sender(move(amount));
  //calls the id procedure defined in our custom module
  LibraAccount.deposit(get_txn_sender(), MyModule.id(move(coin)));
  return;
}
```

In this script, `{{sender}}`will be automatically replaced with sender account address when the script is executed. Alternatively, you could write an import with a fully qualified address:

```
 import 0x810abcc08dbed34ea15d7eb261b8001da6a62d72acdbf87714dd243a175f9b62.MyModule;
```

### Compile Transaction Script

To compile your transaction script, use the [dev compile](reference/libra-cli#dev-d-mdash-operations-related-to-move-transaction-scripts-and-modules) command.

```
libra% dev compile 0 <path_to_custom_script.mvir> script
```

 `custom_script.mvir` is in Move IR, and upon successful compilation of `custom_script.mvir` the compiler will  output the corresponding bytecode file. You'll use this bytecode file (not the `.mvir` file) when you execute this script. After the script is successfully compiled, you'll see the path to the bytecode file in your output:

```
Successfully compiled a program at /var/folders/tq/8gxrrmhx16376zxd5r4h9hhn_x1zq3/T/.tmpDZhL21
```

If you would like to save the bytecode file at a specific path, and not at a temporary path, you can specify it as an argument to the [dev compile](reference/libra-cli#dev-d-mdash-operations-related-to-move-transaction-scripts-and-modules) command.

### Execute Transaction Script

To execute your script, use the [dev execute](reference/libra-cli#dev-d-mdash-operations-related-to-move-transaction-scripts-and-modules) command on the bytecode output from [Compile Transaction Script](#compile-transaction-script) step above.

<blockquote class="block_note">

**Note:** The exact set of arguments passed to the `dev execute` command will depend on the parameters a particular script expects.
</blockquote>

```
libra% dev execute 0 /var/folders/tq/8gxrrmhx16376zxd5r4h9hhn_x1zq3/T/.tmpDZhL21 10
waiting .....transaction is stored!
Successfully finished execution
```

* `0` &mdash; Index/ref_id of the sender account. For this example, it is the same account which compiled and published the module.
* `/var/folders/tq/8gxrrmhx16376zxd5r4h9hhn_x1zq3/T/.tmpDZhL21` &mdash; Path to the compiled_script for this example.
* `10` &mdash; Amount of microlibra. This amount must be less than or equal to the amount in the sender’s account.

## Troubleshooting

### Compile Move Program

If the client cannot locate your Move program (module or script), you'll see this error:

```
libra% dev compile 0 ~/my-tscripts/custom_script.mvir script
>> Compiling program
No such file or directory (os error 2)
```

If you see the following error, refer to the usage of the [dev compile](reference/libra-cli#dev-d-mdash-operations-related-to-move-transaction-scripts-and-modules) command, specify all the required arguments and try compiling again.

```
Invalid number of arguments for compilation
```
For syntax related compilation errors, refer to [Move IR syntax](https://github.com/libra/libra/blob/master/language/compiler/ir_to_bytecode/syntax/src/lib.rs).

### Publish Compiled Module

If you compile a module using one account (e.g., `dev compile` 0 ...) and try to publish it to a different account (e.g., `dev publish` 1 ...), you'll see the following error:

```
libra% dev publish 1 /var/folders/tq/8gxrrmhx16376zxd5r4h9hhn_x1zq3/T/.tmpigAZCx

Transaction failed with vm status: Validation(SendingAccountDoesNotExist("sender address: 21cd9d131bce6050218281f737186861e9dcb7b7804485742e1be8fd564137f9"))

```

A compiled module contains the address of the account where the module is to be published, and the [Move Virtual Machine (VM)](https://developers.libra.org/docs/crates/vm) only allows a transaction sender to publish a module under the sender’s own account address. If this was not true, another user could publish modules under your account! To fix this error, recompile the module using the desired sender address.

If you do not provide the correct path to your compiled module, you'll see this error:

```
libra% dev publish 0 incorrect-path-to-compiled-module
No such file or directory (os error 2)
```
If the account with index 1 does not exist, trying to publish the module to 1 will result in the following error:

```
Unable to find account by account reference id: 1, to see all existing accounts, run: 'account list'
```
Republishing/updating an existing module under the same sender account address does not have any effect on the blockchain. It’s a failed transaction, but it deducts gas from the sender account and increments the sequence number of the sender account by one. It’s possible to publish the same module at a different sender account address, provided the module was compiled using that account address.

### Execute Transaction Script

If the sender account index is invalid, you'll see this error:

```
libra% dev execute 2 /var/folders/tq/8gxrrmhx16376zxd5r4h9hhn_x1zq3/T/.tmpDZhL21 10
Unable to find account by account reference id: 2, to see all existing accounts, run: 'account list'
```

The following error indicates that either the arguments to the transaction script are missing or one or more of the arguments are of the wrong type.

```
libra% dev execute 0 /var/folders/tq/8gxrrmhx16376zxd5r4h9hhn_x1zq3/T/.tmpDZhL21
Transaction failed with vm status: Verification([Script(TypeMismatch("Actual Type Mismatch"))])

```

## Reference

* [Run a Local Network](run-local-network.md) &mdash; Provides information on running a local network.
* [Getting Started with Move](move-overview.md) &mdash; Introduces you to Move, a new blockchain programming language.
* [Move Technical Paper](move-paper.md).
* Move READMEs:
    * [Move Language](https://developers.libra.org/docs/crates/move-language).
    * [Move IR Compiler](https://developers.libra.org/docs/crates/ir-to-bytecode).
    * [Bytecode Verifier](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.libra.org%2Fdocs%2Fcrates%2Fbytecode-verifier&h=AT22hXPt7Fjx80GBMVQ5NOZaVAvQRzD-W4QLZK3j44-Jk11H7EzR7RpTqJpaWX0FMSWFcMdhlvfSTw7TVYk15xAC2fd520s8erlICkc4F_AMTOWrMowCqqG5Qv8RLXROLXZ1MTxGMGq4L1J7czZSas5l).
    * [Virtual Machine](https://developers.libra.org/docs/crates/vm).
* [CLI Guide](reference/libra-cli.md) — Lists the commands of the Libra CLI client.
* [My First Transaction](my-first-transaction.md) &mdash; Guides you through executing your very first transaction on the Libra Blockchain using the Libra CLI client.
