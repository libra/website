---
id: contributing
title: Contribution Guide
---

# Contributing to the Libra project

Our goal is to make contributing to the Libra project easy and transparent.

## On Contributing


### Libra Core

To contribute to the core Libra implementation, first start with the proper development copy.

To get the development installation with all the necessary dependencies for linting, testing, and building the documentation, run the following:
```bash
git clone https://github.com/libra/libra.git
cd libra
cargo install
cargo test
```

## Our Development Process

#### Code Style, Hints, and Testing

Refer to our [Coding Guidelines](coding-guidelines.md) for detailed guidance around how to contribute to the project.

#### Documentation

Libra's website is also open source (the
code can be found in this [repo](https://github.com/libra/libra.github.io/)).
It is built using [Docusaurus](https://docusaurus.io/):

If you know Markdown, you can already contribute! This lives in the the [libra.github.io repo](https://github.com/libra/libra.github.io).

To build the documentation you will need [Node](https://nodejs.org/en/) >= 8.x
and [Yarn](https://yarnpkg.com/en/) >= 1.5.

The following command will both build the docs and serve the site locally:
```bash
cd libra.github.io
cd scripts
./build_docs.sh
```

## Pull Requests
During intial phase of heavy development we plan to only audit and review pull requests. As the codebase stablizes we will be better able to accept pull requests from the community.

1. Fork the repo and create your branch from `master`.
2. If you have added code that should be tested, add unit tests.
3. If you have changed APIs, update the documentation. Make sure the
   documentation builds.
4. Ensure the test suite passes.
5. Make sure your code passes both linters.
6. If you haven't already, complete the Contributor License Agreement ("CLA").
7. Submit your Pull Request.

## Contributor License Agreement ("CLA")

For pull request to be accepted by any Libra projects an invididual or corporate CLA
must be submitted. You will only need to do this once to work on any of Libra's open source projects. You can complete CLAs here: [Individual CLA](https://github.com/libra/libra/blob/master/contributing/individual-cla.pdf) [Corporate CLA](https://github.com/libra/libra/blob/master/contributing/corporate-cla.pdf)

## Issues

Libra uses Github issues to track bugs. Please include necessary information and instructions to reproduce your issue.


## License

By contributing to Libra, you agree that your contributions will be licensed
under the LICENSE file in the root directory of this source tree.
