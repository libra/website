/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock;
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const bash = (...args) => `~~~bash\n${String.raw(...args)}\n~~~`;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="splashLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <Logo img_src={baseUrl + 'img/libra-header-logo-white.png'} />
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('welcome-to-libra')}>Welcome to the Developer Site</Button>
            <Button href={docUrl('the-libra-blockchain-paper.html')}>Libra Blockchain Technical Paper</Button>
            <Button href={docUrl('move-overview.html')}>Getting Started With Move</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Description = () => (
      <Block background="light">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/libra_logo_lockup_white.svg`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );
    // getStartedSection
    const pre = '```';
    // Example for connecting to test network
    const exampleConnectToNetwork = `${pre}rust
    `;
    // Example for creating a wallet
    const exampleCreateWallet = `${pre}rust
    `;
    // Example for sending currency
    const exampleSendingCurrency = `${pre}rust
    `;
    //
    const QuickStart = () => (
      <div
        className="productShowcaseSection"
        id="quickstart"
        style={{textAlign: 'center'}}>
        <h2>Try Libra</h2>
        <p>Currently available for macOS and Linux.</p>
        <Container>
          <ol>
            <li>
              <h4>Clone Libra:</h4>
              <MarkdownBlock>{
bash`git clone git@github.com:libra/libra.git
cd libra`}</MarkdownBlock>
            </li>
            <li>
              <h4>Install dependencies:</h4>
              <MarkdownBlock>{bash`setup_scripts/dev_setup.sh`}</MarkdownBlock>
            </li>
            <li>
              <h4>Run CLI:</h4>
              <MarkdownBlock>{bash`cd scripts/cli && ./start_cli_testnet.sh`}</MarkdownBlock>
            </li>
            <li>
              <h4>Run your first transaction</h4>
                <Button href={'docs/my-first-transaction'}>My First Transaction</Button>
            </li>
          </ol>
        </Container>
        <div>
          <p>Spot a security or privacy issue? Please email <a href="mailto:security@libra.org">security@libra.org</a>.</p>
        </div>
      </div>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="landingPage mainContainer">
          <QuickStart />
        </div>
      </div>
    );
  }
}

module.exports = Index;
