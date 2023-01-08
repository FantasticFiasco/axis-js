# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [5.0.1] - 2023-01-08

### :syringe: Changed

- Update dependencies

## [5.0.0] - 2023-01-08

### :syringe: Changed

- [BREAKING CHANGE] Deprecate Node.js 15 and below

### :policeman: Security

- Security vulnerability in transient dependency `json5`
- Security vulnerability in transient dependency `minimatch`
- Security vulnerability in transient dependency `qs`

## [4.0.0] - 2021-06-15

### :policeman: Security

- Security vulnerability in transient dependency `css-what`
- Security vulnerability in transient dependency `normalize-url`

### :dizzy: Changed

- [BREAKING CHANGE] Deprecate Node.js 13 and below

## [3.0.0] - 2021-01-10

### :policeman: Security

- Replaced deprecated dependency [request](https://github.com/request/request) with [got](https://github.com/sindresorhus/got)

### :dizzy: Changed

- [BREAKING CHANGE] Removed properties `statusCode`, `cause` and `response` from `RequestError`
- [BREAKING CHANGE] Renamed `UnauthorizationError` to `UnauthorizedError`

### :syringe: Fixed

- [#66](https://github.com/FantasticFiasco/axis-js/issues/66) Getting users returned more users than expected

## [2.1.2] - 2020-07-18

### :policeman: Security

- Security vulnerability in transient dependency `lodash`

## [2.1.1] - 2020-05-12

### :syringe: Fixed

- npm package content

## [2.1.0] - 2020-05-10

### :zap: Added

- Support for specifying option `http.Agent` or `https.Agent` when creating a new `Connection`

## [1.0.7] - 2019-12-27

### :policeman: Security

- Security vulnerability in transient dependency `handlebars`

## [2.0.6] - 2019-07-14

### :policeman: Security

- Security vulnerability in transient dependency `diff`
- Security vulnerability in transient dependency `lodash`

## [2.0.5] - 2019-06-07

### :policeman: Security

- Security vulnerability in transient dependency `js-yaml`

## [2.0.4] - 2019-06-07

### :policeman: Security

- Security vulnerability in transient dependency `handlebars`

## [2.0.3] - 2019-03-09

### :policeman: Security

- Security vulnerability in transient dependency `sshpk`
- Security vulnerability in transient dependency `lodash`

## [2.0.2] - 2019-01-07

### :syringe: Fixed

- npm package content

## [2.0.1] - 2019-01-07

### :syringe: Fixed

- Update dependencies

## [2.0.0] - 2017-06-15

### :zap: Added

- Support for configuring parameters using the class `Parameters`

### :skull: Removed

- Support for Node.js v5 since v6 now is LTS

## [1.0.0] - 2017-06-03

### :zap: Added

- Support for configuring user accounts using the class `UserAccounts`
