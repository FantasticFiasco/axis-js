# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### :syringe: Changed

- [BREAKING CHANGE] [#997](https://github.com/FantasticFiasco/axis-js/pull/997) With the [stabilization of the Fetch API in Node.js v21](https://nodejs.org/docs/latest-v21.x/api/globals.html#fetch), this package now uses the Fetch API instead of [got](https://github.com/sindresorhus/got). As a consequence, the following breaking API changes where introduced:
  - `Connection` class - The `options` property has been removed.
  - `DeviceRequest` class - Now extends the Fetch API's `Request` and is specified as an argument to `fetch` when sending a request.
  - `DeviceResponse` class - Removed and conceptually replaced by the Fetch API's `Response`.
  - `Response` class - Removed and conceptually replaced by the Fetch API's `Response`.
  - `get` function - Removed and replaced by the Fetch API's `fetch` function.
  - `RequestError` error - Removed and replaced by the Fetch API's error handling.
  - `UnauthorizedError` error - Removed and replaced by the Fetch API's error handling.
  - `UnknownError` error - Removed and replaced by the Fetch API's error handling.

## [2.0.0] - 2025-01-16

### :syringe: Changed

- [BREAKING CHANGE] Deprecate Node.js v21 and below

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
