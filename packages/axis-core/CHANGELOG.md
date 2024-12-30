# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### :syringe: Changed

- [BREAKING CHANGE] Deprecate Node.js v21 and below
- [BREAKING CHANGE] [#997](https://github.com/FantasticFiasco/axis-js/pull/997) Migration from [got](https://github.com/sindresorhus/got) to [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) for all network operations. This update introduces the following changes:
  - `Connection` no longer accepts `http.Agent` or `https.Agent` as an option.
  - `Response` interface has been removed; standard `fetch` response will now be used.
  - `UnauthorizedError` has been removed; standard `fetch` error behaviors will now be used.
  - `RequestError` has been removed; standard `fetch` error behaviors will now be used.
  - `UnknownError` has been removed; standard `fetch` error behaviors will now be used.
- [BREAKING CHANGE] [#997](https://github.com/FantasticFiasco/axis-js/pull/997) `DeviceRequest` has been changed accordingly:
  - The protected property `connection` has been renamed to `_connection`.
  - The protected function `get` has been renamed to `_get`.
- [BREAKING CHANGE] [#997](https://github.com/FantasticFiasco/axis-js/pull/997) `DeviceResponse` has been changed accordingly:
  - The protected property `response` has been renamed to `_response`.
  - The protected function `body` has been renamed to `_body`.

### :policeman: Security

- Security vulnerability in transient dependency `http-cache-semantics`
- [#808](https://github.com/FantasticFiasco/axis-js/pull/808) Security vulnerability in transient dependency `semver`

## [1.0.1] - 2023-01-08

### :policeman: Security

- Security vulnerability in transient dependency `json5`

## [1.0.0] - 2022-02-19

### :zap: Added

- Support for sending authenticated HTTP GET request to a device using the function `get`
