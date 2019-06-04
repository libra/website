# Contributing to Libra

Our goal is to make contributing to Libra easy and transparent.

## On Contributing


### The Libra Spec

The changes to the Libra specification shall go through a formal process that is still under development.

### The Core Libra Implementation

To contribute to the core Libra implementation, first start with the proper development copy.

To get the development installation with all the necessary dependencies for
linting, testing, and building the documentation, run the following:
```bash
git clone https://github.com/libra/libra.git
cd libra
cargo install
cargo test
```


## Our Development Process

#### Code Style

Libra uses the ____ code formatter to
enforce a common code style across the code base. _____ is installed easily via
cargo using `cargo install ____`, and run locally by calling
```bash
____ .
```
from the repository root. No additional configuration should be needed (see the
[_____ documentation](https://xxxx)
for advanced usage).

We feel strongly that having a consistent code style is extremely important, so
CircleCI will fail on your PR if it does not adhere to the _____ formatting style.


#### Type Hints

Libra is fully typed using Rust vx.x.
We expect any contributions to also use proper type annotations. While we
currently do not enforce full consistency of these in our continuous integration
test, you should strive to type check your code locally. For this we recommend
using [====](https://====.com).


#### Unit Tests

To run the unit tests, you can either use `cargo test` (if installed):
```bash
cargo test
```

To get coverage reports we recommend using the `cargo test-report` plugin:
```bash
cargo test --report
```


#### Documentation

Libra's website is also open source (the
code can be found in this [repo](https://github.com/libra/libra.github.io/)).
It is built using [Docusaurus](https://docusaurus.io/), and consists of three
main elements:

1. The documentation in Docusaurus itself (if you know Markdown, you can
   already contribute!). This lives in the [docs](/docs/).
2. The API reference, auto-generated from [rustdoc](https://rustdoc.org), [protogen](httpa://protogen.org) and embedded into the Docusaurus website.

To build the documentation you will need [Node](https://nodejs.org/en/) >= 8.x
and [Yarn](https://yarnpkg.com/en/) >= 1.5.

The following command will both build the docs and serve the site locally:
```bash
cd scripts
./scripts/build_docs.sh
```

## Pull Requests
During intial phase of heavy development we plan to audit pull requests. As the codebase stablizes we will be better able to accept pull requests from the community.

1. Fork the repo and create your branch from `master`.
2. If you have added code that should be tested, add unit tests.
3. If you have changed APIs, update the documentation. Make sure the
   documentation builds.
4. Ensure the test suite passes.
5. Make sure your code passes both `----` and `====` formatting checks.
6. If you haven't already, complete the Contributor License Agreement ("CLA").


## Contributor License Agreement ("CLA")

For pull request to be accepted by any Libra projects, we need you to submit a CLA.
You will only need to do this once to work on any of Libra's open source projects.
You can complete your CLA here: <https://github.com/libra/libra/blob/master/CLA.md>


## Issues

Libra uses Github issues to track bugs. Please include necessary information and instructions to reproduce your issue.

Security issues should be submitted to the Libra Bug Bounty program. More information
about this program will be released in the coming days.


## License

By contributing to Libra, you agree that your contributions will be licensed
under the LICENSE file in the root directory of this source tree.
