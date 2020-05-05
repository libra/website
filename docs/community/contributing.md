---
id: contributing
title: Contribution Guide
---

Our goal is to make contributing to the Libra project easy and transparent.

<blockquote class="block_note">
The Libra Core project is currently an early-stage prototype, it is undergoing rapid development. Before making any substantial contribution to the project, be sure to discuss it in the Discourse forum to ensure that it fits into the project roadmap.
</blockquote>

## Contributor License Agreement

The Libra project follows many popular Open Source projects by requiring a signed CLA before accepting contributions. [Sign the CLA](https://libra.org/en-US/cla-sign/).

## Contributing to Libra Core

To contribute to Libra Core, ensure that you have the latest version of the codebase. To setup Libra Core with all the necessary dependencies for linting, testing, and building the documentation, run the following:
```
$ git clone https://github.com/libra/libra.git
$ cd libra
$ ./scripts/dev_setup.sh
$ source ~/.cargo/env
$ cargo build
$ cargo xtest
```

If you would like to contribute, please do the following:

* Visit [Libra on GitHub](https://github.com/libra/libra)
* Select fork and fork into your own account
* Add your fork as a remote repository
* Push your commits to your repository
* Make a pull request to merge into libra/libra

## Coding Guidelines

For detailed guidance on how to contribute to the Libra Core codebase refer to [Coding Guidelines](coding-guidelines.md).

## Documentation

All developer documentation is published on the Libra developer site. The developer site is open source, and the code for building the site is located in this [repository](https://github.com/libra/website/). The developer site is built using [Docusaurus](https://docusaurus.io/).

If you are familiar with Markdown, you can start contributing!

## Pull Requests

To submit your pull request:

1. Fork the `libra` repo and create your branch from `master`.
2. If you have added code that should be tested, add unit tests.
3. If you have made changes to APIs, update the relevant documentation, and build and test the developer site.
4. Verify and ensure that the test suite passes.
5. Make sure your code passes both linters.
6. Complete the Contributor License Agreement (CLA), if you haven't already done so.
7. Submit your pull request.

## Code of Conduct
Please refer to the [Code of Conduct](../policies/code-of-conduct.md), which describes the expectations for interactions within the community.

## Issues

Libra uses [GitHub issues](https://github.com/libra/libra/issues) to track bugs. Please include necessary information and instructions to reproduce your issue. Security-related bugs should be reported using our [security procedures](../policies/security.md).
