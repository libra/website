/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const PropTypes = require('prop-types');
const React = require('react');

function SocialFooter(props) {
  const repoUrl = `https://github.com/${props.config.organizationName}/${
    props.config.projectName
  }`;
  return (
    <div className="footerSection">
      <h5>Social</h5>
      <div className="social">
        <a
          className="github-button" // part of the https://buttons.github.io/buttons.js script in siteConfig.js
          href={repoUrl}
          data-count-href={`${repoUrl}/stargazers`}
          data-show-count="true"
          data-count-aria-label="# stargazers on GitHub"
          aria-label="Star Libra on GitHub">
          {props.config.projectName}
        </a>
      </div>
    </div>
  );
}

SocialFooter.propTypes = {
  config: PropTypes.object,
};

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          {this.props.config.footerIcon && (
            <a href={this.props.config.baseUrl} className="nav-home">
              <img
                src={`${this.props.config.baseUrl}${
                  this.props.config.footerIcon
                }`}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            </a>
          )}
          <div className="footerSection">
            <h5>Docs</h5>
            <a href={this.docUrl('introduction')}>Welcome to Libra</a>
            <a href={this.docUrl('getting-started')}>Getting Started</a>
            <a href={this.docUrl('life-of-a-transaction')}>Life of a Transaction</a>
            <a href={this.docUrl('move/overview')}>Overview of Move</a>
            <a href={this.docUrl('libra-spec')}>Libra Specification</a>
            <a href={`${this.props.config.baseUrl}rustdoc`}>Rustdoc</a>
          </div>
          <SocialFooter config={this.props.config} />
        </section>
        <section className="copyright">
          {this.props.config.copyright && (
            <span>{this.props.config.copyright}</span>
          )}{' '}
          Copyright &copy; {currentYear} Libra Association.
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
