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
    id: 'move/overview-v2',
    type: 'doc',
  },
  {
    extra: {
      classNames: ['categoryIndex', 'normalWeight'],
    },
    href: '/docs/move/overview-v2',
    label: 'Overview',
    type: 'link',
  },
];

module.exports = Sidebar;
