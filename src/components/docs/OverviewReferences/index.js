import React from 'react';

import SimpleCard from '../Cards/SimpleCard';

const CoreReference = () => (
  <SimpleCard
    icon="img/core-contributors.svg"
    iconDark="img/core-contributors-dark.svg"
    smallerImage
    title="Core contributor overview"
    to="/docs/core/overview"
  />
);

const MerchantReference = () => (
  <SimpleCard
    icon="img/docs/merchant-solutions.svg"
    iconDark="img/docs/merchant-solutions-dark.svg"
    smallerImage
    title="Merchant solutions overview"
    to="/docs/merchant/overview"
  />
);

const WalletReference = () => (
  <SimpleCard
    icon="img/wallet-app.svg"
    iconDark="img/wallet-app-dark.svg"
    smallerImage
    title="Wallet developer overview"
    to="/docs/wallet-app/overview"
  />
);

const MoveReference = () => (
  <SimpleCard
    icon="img/move.svg"
    iconDark="img/move-dark.svg"
    smallerImage
    title="Move overview"
    to="/docs/move/overview"
  />
);

const NodeReference = () => (
  <SimpleCard
    icon="img/node-operators.svg"
    iconDark="img/node-operators-dark.svg"
    smallerImage
    title="Node overview"
    to="/docs/node/overview"
  />
);

export default {
  CoreReference,
  MerchantReference,
  WalletReference,
  MoveReference,
  NodeReference,
};
