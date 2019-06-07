/**
 * Copyright (c) 2019-present, Libra Association.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const markdownPlugins = require(`${process.cwd()}/markdownPlugins.js`);

// Define this so it can be easily modified in scripts (to host elsewhere)
const baseUrl = '/~ericnakagawa/lufdvtkvdknjluvfrnbrhgbrclkdnvir/libra/';

// List of projects/orgs using your project for the users page.
const users = [];

const siteConfig = {
  title: 'Libra',
  tagline: 'A simple, borderless global currency and financial ecosystem designed to empower billions of people.',
  url: 'https://libra.org',
  baseUrl: baseUrl,
  cleanUrl: true, // No .html extensions for paths

  headerIcon: 'img/libra-nav-logo.png',
  footerIcon: 'img/libra-logomark-white.png',
  favicon: 'img/libra.ico',

  // used for publishing and more
  organizationName: 'libra',
  projectName: 'libra',

  // Page analytics
  // gaTrackingId: 'UA-XXXXX-2',

  // links that will be used in the header navigation bar
  headerLinks: [
    {doc: 'welcome', label: 'Documentation'},
    {href: `${baseUrl}rustdoc/admission_control/`, label: 'Rustdoc'},
    {href: 'https://libra.trydiscourse.com', label: 'Community'},
    {blog: true, label: "Blog" },
    {href: 'https://libra.org', label: 'libra.org'},
    {href: 'https://github.com/libra/libra', label: 'GitHub'},
    {search: true}, // position search box to the very right
  ],

  // add users to the website
  users,

  // search integration w/ algolia
  algolia: {
    apiKey: '7c82db8b8ceae28c1601f34346452f65',
    indexName: 'libra.github.io',
  },

  // colors for website
  colors: {
    primaryColor: '#3333ff', // dark blue
    secondaryColor: '#aaaaff', // light blue
  },

  highlight: {
    theme: 'default',
  },

  // custom scripts that are placed in <head></head> of each page
  scripts: [
    // Github buttons
    'https://buttons.github.io/buttons.js',
    // Copy-to-clipboard button for code blocks
    `${baseUrl}js/code_block_buttons.js`,
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
  ],

  // CSS sources to load
  stylesheets: [`${baseUrl}css/code_block_buttons.css`],

  // Custom markdown functions
  markdownPlugins: markdownPlugins,

  // enable on-page navigation for the current documentation page
  onPageNav: 'separate',

  // enable scroll to top button a the bottom of the site
  scrollToTop: true,

  // if true, expand/collapse links & subcategories in sidebar
  docsSideNavCollapsible: false,

  // URL for editing docs
  editUrl: 'https://github.com/libra/libra.github.io/edit/master/docs/',

  // Open Graph and Twitter card images
  ogImage: 'img/libra.png',
  twitterImage: 'img/libra.png',

  // show html docs generated by rustdoc
  wrapPagesHTML: true,
};

module.exports = siteConfig;
