/**
 * Copyright (c) The Libra Core Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const CWD = process.cwd();
// const PropTypes = require('prop-types');
const React = require('react');
const SubNav = require('./SubNav');

// header navbar used by all pages generated with docusaurus
class HeaderNav extends React.Component {
  // function to generate each header link, used with each object in this.props.config.headerLinks
  makeLinks(link) {
    let href;
    let docItemActive = false;
    let docGroupActive = false;
    if (link.search && this.props.config.algolia) {
      // return algolia search bar
      const placeholder = this.props.config.algolia.placeholder || 'Search';
      return (
        <li className="navSearchWrapper reactNavSearchWrapper" key="search">
          <input
            id="search_input_react"
            type="text"
            placeholder={placeholder}
            title={placeholder}
          />
        </li>
      );
    }
    if (link.doc) {
      // set link to document with current page's language/version
      const langPart = '';
      const versionPart = '';
      const id = langPart + versionPart + link.doc;
      href =
        this.props.config.baseUrl +
        this.props.getPath(this.props.metadata[id].permalink, this.props.config.cleanUrl);

      const { id: currentID, sidebar } = this.props.current;
      docItemActive = currentID && currentID === id;
      docGroupActive = sidebar && sidebar === this.props.metadata[id].sidebar;
    } else if (link.page) {
      // set link to page with current page's language if appropriate
      href = this.props.config.baseUrl + link.page;
    } else if (link.href) {
      // set link to specified href
      href = link.href;
    } else if (link.blog) {
      // set link to blog url
      href = `${this.props.baseUrl}blog/`;
    }
    const itemClasses = this.props.classNamesFn({
      siteNavGroupActive: (link.doc && docGroupActive) || (link.blog && this.props.current.blog),
      siteNavItemActive:
        docItemActive ||
        (link.blog && this.props.current.blogListing) ||
        (link.page && link.page === this.props.current.id) ||
        link.selected,
      highlight: link.highlight,
    });
    const i18n = this.props.translation[this.props.language];
    return (
      <li key={`${link.label}page`} className={itemClasses}>
        <a href={href} target={link.external ? '_blank' : '_self'}>
          {this.props.idx(i18n, ['localized-strings', 'links', link.label]) || link.label}
        </a>
      </li>
    );
  }

  renderResponsiveNav() {
    const headerLinks = this.props.config.headerLinks;
    const search = headerLinks.reduce((hasSearch, link) => hasSearch || link.search, false);
    if (!search && this.props.config.algolia) {
      headerLinks.push({ search: true });
    }
    return (
      <div className="navigationWrapper navigationSlider">
        <nav className="slidingNav">
          <ul className="nav-site nav-site-internal">{headerLinks.map(this.makeLinks, this)}</ul>
        </nav>
      </div>
    );
  }

  render() {
    const headerClass = this.props.config.headerIcon ? 'headerTitleWithLogo' : 'headerTitle';
    return (
      <div className="fixedHeaderContainer">
        <div className="headerWrapper">
          <header>
            <div className="main-nav">
              <a href={this.props.baseUrl}>
                {this.props.config.headerIcon && (
                  <img
                    className="logo"
                    src={this.props.baseUrl + this.props.config.headerIcon}
                    alt={this.props.config.title}
                  />
                )}
                {!this.props.config.disableHeaderTitle && (
                  <h2 className={headerClass}>{this.props.title}</h2>
                )}
              </a>
              {this.renderResponsiveNav()}
            </div>
          </header>
        </div>
        <SubNav {...this.props} />
      </div>
    );
  }
}

HeaderNav.defaultProps = {
  current: {},
};

module.exports = HeaderNav;
