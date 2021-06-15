# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [3.0.0] - 2021-06-15

### :policeman: Security

- Security vulnerability in transient dependency `css-what`
- Security vulnerability in transient dependency `normalize-url`

### :dizzy: Changed

- [BREAKING CHANGE] Deprecate Node.js 13 and below

## [2.0.0] - 2021-01-10

### :policeman: Security

- Replaced deprecated dependency [request](https://github.com/request/request) with [got](https://github.com/sindresorhus/got)

### :dizzy: Changed

- [BREAKING CHANGE] Removed properties `statusCode`, `cause` and `response` from `RequestError`
- [BREAKING CHANGE] Renamed `UnauthorizationError` to `UnauthorizedError`

## [1.1.1] - 2020-05-12

### :syringe: Fixed

- npm package content

## [1.1.0] - 2020-05-10

### :zap: Added

- Support for specifying option `http.Agent` or `https.Agent` when creating a new `Connection`

## [1.0.0] - 2017-07-16

### :zap: Added

- Support for running maintenance operations on cameras from [Axis Communications](http://www.axis.com/)
