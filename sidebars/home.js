const {getReference} = require('./components');

const Sidebar = [

  {
    type: 'doc',
    id: 'welcome-to-libra',
    extra: {
      classNames: ['home'],
      icon: 'img/home.svg',
      iconDark: 'img/home-dark.svg',
    },
  },
  {
    extra: {
      icon: 'img/core-contributors.svg',
      iconDark: 'img/core-contributors-dark.svg',
      iconClasses: ['listTitle'],
    },
    label: 'Libra Core Protocol',
    type: 'category',
    items: [
      'core/libra-protocol',
      'core/accounts',
      'core/transaction-types',
      'core/gas',
      'core/nodes',
      'core/clients',
      'core/events',
    ]
  },
  {
    extra: {
      icon: 'img/wallet-app.svg',
      iconDark: 'img/wallet-app-dark.svg',
      iconClasses: ['listTitle'],
    },
    label: 'Wallets',
    type: 'category',
    items: [
      'wallet-app/intro-to-lrw',
      'wallet-app/develop-reference-wallet',
    ]
  },
  {
    extra: {
      icon: 'img/merchant-solutions.svg',
      iconDark: 'img/merchant-solutions-dark.svg',
      iconClasses: ['listTitle'],
    },
    label: 'Merchants',
    type: 'category',
    items: [
      'merchant/overview',
      'merchant/architecture',
    ]
  },
  {
    type: 'category',
    label: 'Tutorials',
    items: [
      {
        type: 'doc',
        id: 'core/my-first-transaction',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/core-contributors.svg',
          iconDark: 'img/core-contributors-dark.svg',
        },
      },
      {
        type: 'doc',
        id: 'core/my-first-client',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/core-contributors.svg',
          iconDark: 'img/core-contributors-dark.svg',
        },
      },
      {
        type: 'doc',
        id: 'wallet-app/public-demo-wallet',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/wallet-app.svg',
          iconDark: 'img/wallet-app-dark.svg',
        },
      },
      {
        type: 'doc',
        id: 'wallet-app/try-local-web-wallet',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/wallet-app.svg',
          iconDark: 'img/wallet-app-dark.svg',
        },
      },
      {
        type: 'doc',
        id: 'wallet-app/try-local-mobile-wallet',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/wallet-app.svg',
          iconDark: 'img/wallet-app-dark.svg',
        },
      },
      {
        type: 'doc',
        id: 'merchant/try-local-merchant',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/merchant-solutions.svg',
          iconDark: 'img/merchant-solutions-dark.svg',
        },
      },
    ]
  },
  {
    extra: {
      icon: 'img/core-contributors.svg',
      iconDark: 'img/core-contributors-dark.svg',
      iconClasses: ['listTitle'],
    },
    label: 'Developing',
    type: 'category',
    items: [
      {
        type: 'link',
        href: 'https://github.com/orgs/libra/projects/1',
        label: 'Roadmap',
      },
      'core/libra-open-source-paper',
      'core/contributing',
      'core/coding-guidelines',
      'core/libra-cli',
    ]
  },
  {
    extra: {
      icon: 'img/develop.svg',
      iconDark: 'img/develop-dark.svg',
      iconClasses: ['listTitle'],
    },
    label: 'SDKs',
    type: 'category',
    items: [
      {
        type: 'link',
        href: 'https://github.com/libra/libra-client-sdk-cplusplus',
        label: 'C++',
      },
      {
        type: 'link',
        href: 'https://github.com/libra/libra-client-sdk-csharp',
        label: 'C#',
      },
      {
        type: 'link',
        href: 'https://github.com/libra/libra-client-sdk-go',
        label: 'Go',
      },
      {
        type: 'link',
        href: 'https://github.com/libra/libra-client-sdk-java',
        label: 'Java',
      },
      {
        type: 'link',
        href: 'https://github.com/libra/libra-client-sdk-python',
        label: 'Python',
      },
      {
        type: 'link',
        href: 'https://github.com/libra/libra-client-sdk-typescript',
        label: 'TypeScript',
      },
    ]
  },
  getReference('primary'),
];

module.exports = Sidebar;
