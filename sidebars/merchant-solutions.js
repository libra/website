const {backToHome} = require('./components');

const Sidebar = [
  backToHome,
  {
    extra: {
      classNames: ['categoryLabel'],
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
      classNames: ['categoryIndex'],
    },
    href: '/docs/merchant/overview',
    label: 'Overview',
    type: 'link',
  },
];

module.exports = Sidebar;
