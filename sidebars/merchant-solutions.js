const {backToHome} = require('./components');

const Sidebar = [
  backToHome,
  {
    extra: {
      classNames: ['categoryLabel', 'spacerMD'], // one class
      icon: 'img/merchant-solutions.svg',
      iconDark: 'img/merchant-solutions-dark.svg',
      iconClasses: ['iconLeft'],
      noLink: true,
    },
    id: 'merchant/overview',
    type: 'doc',
  },
  {
    extra: {
      classNames: ['categoryIndex', 'normalWeight'], // one class
    },
    href: '/docs/merchant/overview',
    label: 'Overview',
    type: 'link',
  },
];

module.exports = Sidebar;
