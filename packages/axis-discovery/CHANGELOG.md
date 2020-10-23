# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [2.0.0] - 2020-10-12

### :dizzy: Changed

- [BREAKING CHANGE] Changed signature of `Discovery.ctor`
- [BREAKING CHANGE] Renamed method `Discovery.onHello(callback: (device: Device) => void)` to `Discovery.on("hello", (device: Device) => void)`
- [BREAKING CHANGE] Renamed method `Discovery.onGoodbye(callback: (device: Device) => void)` to `Discovery.on("goodbye", (device: Device) => void)`

### :zap: Added

- Class `Discovery` implements `EventEmitter`

## [1.1.5] - 2019-12-27

### :policeman: Security

- Security vulnerability in transient dependency `handlebars`

## [1.1.4] - 2019-07-14

### :policeman: Security

- Security vulnerability in transient dependency `diff`
- Security vulnerability in transient dependency `lodash`

## [1.1.3] - 2019-06-07

### :policeman: Security

- Security vulnerability in transient dependency `handlebars`
- Security vulnerability in transient dependency `js-yaml`

## [1.1.2] - 2019-03-10

### :policeman: Security

- Security vulnerability in transient dependency `sshpk`

## [1.1.1] - 2019-01-07

### :syringe: Fixed

- Update dependencies

## [1.1.0] - 2017-11-27

### :zap: Added

- `Discovery.ctor` now support dependency injection, where instances of `require('axis-discovery-bonjour').Discovery` and `require('axis-discovery-ssdp').Discovery` can be specified. This enables the possibility of configuring each individual discovery protocol.

## [1.0.2] - 2017-11-23

### :syringe: Fixed

- Creating package using [yarn](https://yarnpkg.com/en/) does not produce a complete package, revert back to use [npm](https://www.npmjs.com/)

## [1.0.1] - 2017-11-22

### :syringe: Fixed

- During a cache hit the properties of a device sometimes gets overwritten with the value of `undefined`

## [1.0.0] - 2017-07-16

### :zap: Added

- Support for discovering [Axis Communications](http://www.axis.com/) devices on the network using Bonjour and SSDP (UPnP)
