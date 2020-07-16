---
id: welcome-to-libra
title: Libra Developer Documentation
disable_pagination: true
sidebar_label: Home
---

<span />

## Welcome to Libra!

The Libra payment system is built on a secure, scalable, and reliable blockchain.

The [Libra Association](https://www.libra.org) manages the development roadmap for Libra Core, and oversees the public process for proposing changes to it. The Libra Association’s subsidiary, Libra Networks, is responsible for and manages all aspects of the Libra Payment Network, which is the layer where all payment-related activity and decisions occur.

<CardsWrapper title="We welcome developers who want to">
  <OverlayCard
    description="Contribute to the Libra Blockchain"
    icon="img/core-contributors.svg"
    iconDark="img/core-contributors-dark.svg"
    title="Contribute to Libra Core"
    to="#"
  />
  <OverlayCard
    description="Develop a wallet for the Libra Payment Network"
    icon="img/wallet-app.svg"
    iconDark="img/wallet-app-dark.svg"
    title="Build a Wallet"
    to="#"
  />
  <OverlayCard
    description="Learn about and experiment with the Move programming language"
    icon="img/move.svg"
    iconDark="img/move-dark.svg"
    title="Develop with Move"
    to="#"
  />
  <OverlayCard
    description="Accept payments and integrate with the network"
    icon="img/docs/merchant-solutions.svg"
    iconDark="img/docs/merchant-solutions-dark.svg"
    title="Accept Payments"
    to="#"
  />
  <OverlayCard
    description="Learn how to operate full nodes in the Libra Blockchain"
    icon="img/move.svg"
    iconDark="img/move-dark.svg"
    title="Run a Full Node"
    to="#"
  />
</CardsWrapper>

<WaveBackground />

## Discover Libra documentation

<MultiStepSnippet
  defaultValue="my-first-transaction"
  values={[
    { value: 'my-first-transaction', label: (
      <ColorCard
        color="purpleDark"
        icon="img/transaction.svg"
        overlay="Create accounts and send your first transaction on the Libra Blockchain testnet."
        title="Send your first transaction on the testnet"
        type="snippetTab"
      />
    )},
    { value: 'run-move', label: (
      <ColorCard
        color="purpleLight"
        icon="img/docs/move-program.svg"
        overlay="Execute a sample Move script in a local network "
        title="Run a Move program"
        type="snippetTab"
      />
    )},
    { value: 'demo-wallet', label: (
      <ColorCard
        color="aqua"
        icon="img/docs/try-a-wallet.svg"
        overlay="Demo the Libra Reference Wallet to learn how wallets work on the blockchain."
        title="Try out our reference wallet"
        type="snippetTab"
      />
    )},
  ]
}>
<MultiStepTabItem value="my-first-transaction" learnMoreLink="/docs/core/my-first-transaction">

```bash
# Create two accounts and transfer LBR between the two.
# This uses the testnet for experimentation

libra% account create
libra% account create
libra% account list
libra% account mint 0 110 LBR
libra% account mint 1 52 LBR
libra% query balance 0
libra% query balance 1
libra% transfer 0 1 10 LBR
libra% query balance 0
libra% query balance 1

libra% account create
libra% account create
libra% account list
libra% account mint 0 110 LBR
libra% account mint 1 52 LBR
libra% query balance 0
libra% query balance 1
libra% transfer 0 1 10 LBR
libra% query balance 0
libra% query balance 1
```

</MultiStepTabItem>
<MultiStepTabItem value="run-move" learnMoreLink="/docs/core/run-move-locally">

```bash
script {
  use 0x0::LibraAccount;
  use 0x0::LBR;
  use 0x0::Transaction;
  use 0x717da70a461fef6307990847590ad7af::MyModule;

  fun main(amount: u64) {
    let coin = LibraAccount::withdraw_from_sender<LBR::T>(amount);
    // Calls the id procedure defined in our custom module
    LibraAccount::deposit<LBR::T>(Transaction::sender(), MyModule::id(coin));
  }
}
```

</MultiStepTabItem>
<MultiStepTabItem value="demo-wallet">

```bash
git clone git@github.com:libra/libra-wallet.git
```

</MultiStepTabItem>
</MultiStepSnippet>

## Explore Github

<CardsWrapper>
  <TagCard
    icon="img/github.svg"
    iconDark="img/github-dark.svg"
    tags={["Web", "Mobile", "Merchant"]}
    title="Reference Wallet"
    to="https://github.com/libra"
  />
  <TagCard
    icon="img/github.svg"
    iconDark="img/github-dark.svg"
    tags={["Web", "Mobile", "Merchant"]}
    title="Reference Merchant"
    to="https://github.com/libra"
  />
  <TagCard
    icon="img/github.svg"
    iconDark="img/github-dark.svg"
    tags={["Web", "Mobile", "Core"]}
    title="Libra Core"
    to="https://github.com/libra"
  />
</CardsWrapper>

<div className="margin-vert--lg" />

Check out the Libra Payment Network’s documentation and community sites, and stay up to date by signing up for our newsletter here.

<div className="margin-vert--lg" />

Tell us your plan to build a product or service. We know that not all aspects of the Libra Payment Network will be available immediately to some developers. We're excited to work with the community to evolve these features, and look forward to your participation!
