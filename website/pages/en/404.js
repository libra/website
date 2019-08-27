/**
 * Copyright (c) The Libra Core Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Sorry we can't find that page.</h1>
          </header>
          <p>You will be redirected to our blog shortly.</p>
          <script type = "text/javascript">
          window.location = "https://developers.libra.org/blog";
          </script>
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
