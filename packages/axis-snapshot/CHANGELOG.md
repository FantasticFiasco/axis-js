# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [6.0.0] - 2025-02-16

### :syringe: Changed

- [BREAKING CHANGE] [#997](https://github.com/FantasticFiasco/axis-js/pull/997) With the [stabilization of the Fetch API in Node.js v21](https://nodejs.org/docs/latest-v21.x/api/globals.html#fetch), this package now uses the Fetch API instead of [got](https://github.com/sindresorhus/got). As a consequence, the following breaking changes where introduced:
  - `Connection` class - The `options` property has been removed.
  - `UnauthorizedError` error - Removed and replaced by the Fetch API's error handling.
  - `RequestError` error - Removed and replaced by the Fetch API's error handling.
  - `UnknownError` error - Removed and replaced by the Fetch API's error handling.
- `Connection` and `Protocol` are now exported from this package, meaning you don't have to import them from `axis-core`.

## [5.0.0] - 2025-01-16

### :syringe: Changed

- [BREAKING CHANGE] Deprecate Node.js v21 and below

### :policeman: Security

- Security vulnerability in transient dependency `http-cache-semantics`
- [#807](https://github.com/FantasticFiasco/axis-js/pull/807) Security vulnerability in transient dependency `@babel/traverse`

## [4.0.0] - 2023-01-08

### :syringe: Changed

- [BREAKING CHANGE] Deprecate Node.js 15 and below

### :policeman: Security

- Security vulnerability in transient dependency `json5`
- Security vulnerability in transient dependency `minimatch`
- Security vulnerability in transient dependency `qs`

## [3.0.0] - 2021-06-15

### :policeman: Security

- Security vulnerability in transient dependency `normalize-url`

### :dizzy: Changed

- [BREAKING CHANGE] Deprecate Node.js 13 and below

## [2.0.0] - 2021-01-10

### :policeman: Security

- Replaced deprecated dependency [request](https://github.com/request/request) with [got](https://github.com/sindresorhus/got)

### :dizzy: Changed

- [BREAKING CHANGE] Removed properties `statusCode`, `cause` and `response` from `RequestError`

## [1.0.0] - 2020-10-22

### :zap: Added

- Support for getting BMP snapshots using the class `Snapshot`
- Support for getting JPEG snapshots using the class `Snapshot`
