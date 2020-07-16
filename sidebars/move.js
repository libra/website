const {backToHome} = require('./components');

const Sidebar = [
  backToHome,
  {
    extra: {
      classNames: ['categoryLabel', 'spacerMD'],
      icon: 'img/move.svg',
      iconDark: 'img/move-dark.svg',
      iconClasses: ['iconLeft'],
      noLink: true,
    },
    id: 'move/overview',
    type: 'doc',
  },
  {
    extra: {
      classNames: ['categoryIndex', 'normalWeight'],
    },
    href: '/docs/move/overview',
    label: 'Overview',
    type: 'link',
  },
];

module.exports = Sidebar;
