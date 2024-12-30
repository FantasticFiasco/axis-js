# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [2.0.0] - 2025-01-16

### :syringe: Changed

- [BREAKING CHANGE] Deprecate Node.js v21 and below
- [BREAKING CHANGE] [#997](https://github.com/FantasticFiasco/axis-js/pull/997) Migration from [got](https://github.com/sindresorhus/got) to [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) for all network operations. This update introduces the following changes:
  - The `UnauthorizedError` has been removed; standard `fetch` error behaviors will now be used.
  - The `RequestError` has been removed; standard `fetch` error behaviors will now be used.
  - The `UnknownError` has been removed; standard `fetch` error behaviors will now be used.

### :syringe: Fixed

- [#994](https://github.com/FantasticFiasco/axis-js/pull/994) Fix issue with `get` function not returning the correct response type. (contribution by [@spinda](https://github.com/spinda))

### :policeman: Security

- Security vulnerability in transient dependency `http-cache-semantics`
- [#808](https://github.com/FantasticFiasco/axis-js/pull/808) Security vulnerability in transient dependency `semver`

## [1.0.1] - 2023-01-08

### :policeman: Security

- Security vulnerability in transient dependency `json5`

## [1.0.0] - 2022-02-19

### :zap: Added

- Support for sending authenticated HTTP GET request to a device using the function `get`
