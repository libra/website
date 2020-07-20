const {backToHome, getReference} = require('./components');

const Sidebar = [
   backToHome,
  {
    extra: {
      classNames: ['categoryLabel'],
      icon: 'img/wallet-app.svg',
      iconDark: 'img/wallet-app-dark.svg',
      iconClasses: ['iconLeft'],
    },
    id: 'wallet-app/overview',
    type: 'doc',
  },
  {
    extra: {
      classNames: ['categoryIndex'],
    },
    href: '/docs/wallet-app/overview',
    label: 'Overview',
    type: 'link',
  },
  {
    extra: {
      iconClasses: ['listTitle'],
      icon: 'img/concepts.svg',
      iconDark: 'img/concepts-dark.svg',
    },
    label: 'Concepts',
    type: 'category',
    items: [
      'wallet-app/intro-to-lrw',
      'wallet-app/wallet-arch',
      'wallet-app/liquidity',
    ]
  },
  {
    extra: {
      iconClasses: ['listTitle'],
      icon: 'img/tutorials.svg',
      iconDark: 'img/tutorials-dark.svg',
    },
    label: 'Tutorials',
    type: 'category',
    items: [
      'wallet-app/public-demo-wallet',
      'wallet-app/try-local-web-wallet',
      'wallet-app/try-local-mobile-wallet',
      'wallet-app/try-wallet-admin',
    ]
  },
  {
    extra: {
      iconClasses: ['listTitle'],
      icon: 'img/develop.svg',
      iconDark: 'img/develop-dark.svg',
    },
    label: 'Develop',
    type: 'category',
    items: [
      'wallet-app/set-up-reference-wallet',
      'wallet-app/login-and-auth',
      'wallet-app/custody-mod',
      'wallet-app/compliance-mod',
      'wallet-app/risk-mod',
      'wallet-app/trxn-wf',
      'wallet-app/storage-mod',
      'wallet-app/service-api',
      'wallet-app/pubsub',
      'wallet-app/liquidity-mod',
      'wallet-app/admin-mod',
      'wallet-app/localizn',
      'wallet-app/public-demo-wallet',
      {
        type: 'link',
        href: 'https://demo-wallet.libra.org/api/apidocs',
        label: 'Backend Swagger API',
      },
    ]
  },
  getReference(),
];

module.exports = Sidebar;

