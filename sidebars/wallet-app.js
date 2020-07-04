const {backToHome} = require('./components');

const Sidebar = [
  backToHome,
  {
    extra: {
      classNames: ['categoryLabel', 'spacerMD'],
      icon: 'img/wallet-app.svg',
      iconDark: 'img/wallet-app-dark.svg',
      iconClasses: ['iconLeft'],
      noLink: true,
    },
    id: 'wallet-app/overview',
    type: 'doc',
  },
  {
    extra: {
      classNames: ['categoryIndex', 'normalWeight'],
    },
    href: '/docs/wallet-app/overview',
    label: 'Overview',
    type: 'link',
  },
];

module.exports = Sidebar;
