const {backToHome, getReference} = require('./components');

const Sidebar = [
   backToHome,
  {
    extra: {
      classNames: ['categoryLabel'],
      icon: 'img/core-contributors.svg',
      iconDark: 'img/core-contributors-dark.svg',
      noLink: true,
    },
    id: 'core/overview-v2',
    type: 'doc',
  },
  {
    extra: {
      classNames: ['categoryIndex'], // make one class
    },
    href: '/docs/core/overview-v2',
    label: 'Overview',
    type: 'link',
  },
  {
    extra: {
      icon: 'img/concepts.svg',
      iconDark: 'img/concepts-dark.svg',
      iconClasses: ['listTitle'],
    },
    label: 'Concepts',
    type: 'category',
    items: [
      'core/libra-protocol',
      'core/life-of-a-transaction',
      'core/the-libra-blockchain-paper',
      'core/move-paper',
      'core/state-machine-replication-paper',
      'core/libra-core-overview',
    ]
  },
  {
    extra: {
      icon: 'img/tutorials.svg',
      iconDark: 'img/tutorials-dark.svg',
      iconClasses: ['listTitle'],
    },
    label: 'Tutorials',
    type: 'category',
    items: [
      'core/my-first-transaction',
      'core/move-overview',
      'core/run-local-network',
      'core/run-move-locally',
    ]
  },
  {
    extra: {
      icon: 'img/develop.svg',
      iconDark: 'img/develop-dark.svg',
      iconClasses: ['listTitle'],
    },
    label: 'Develop',
    type: 'category',
    items: [
      'core/libra-open-source-paper',
      'core/contributing',
      'core/coding-guidelines',
      'core/libra-cli',
    ]
  },
  getReference(),
];

module.exports = Sidebar;
