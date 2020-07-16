const backToHome = {
  extra: {
    classNames: ['backToHome'],
    icon: 'img/shared/arrow-left.svg',
    iconHover: 'img/shared/arrow-left-hover.svg',
    iconDarkHover: 'img/shared/arrow-left-dark-hover.svg',
  },
  href: '/docs/welcome-to-libra',
  label: 'Home',
  type: 'link',
};

const getReference = (theme = 'secondary') => {
  const classNames = ['reference'];
  const type = theme === 'primary' ? 'doc' : 'ref';

  if (theme === 'secondary') {
    classNames.push({
      global: true,
      name: 'margin-top--md',
    });
  }

  return {
    extra: {
      classNames: classNames,
    },
    label: 'Reference',
    type: 'category',
    items: [
      {
        type,
        id: 'reference/glossary',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/terminology.svg',
          iconDark: 'img/terminology-dark.svg',
        },
      },
      {
        type,
        id: 'reference/compliance',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/compliance.svg',
          iconDark: 'img/compliance-dark.svg',
        }
      },
      {
        type,
        id: 'reference/security',
        extra: {
          classNames: ['iconIndented'],
          icon: 'img/security.svg',
          iconDark: 'img/security-dark.svg',
        }
      }
    ],
  };
};

module.exports = {
  backToHome,
  getReference,
};
