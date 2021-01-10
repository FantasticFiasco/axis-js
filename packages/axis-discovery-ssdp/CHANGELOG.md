# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [6.0.1] - 2021-01-10

### :policeman: Security

- Replaced deprecated dependency [request](https://github.com/request/request) with [got](https://github.com/sindresorhus/got)

## [6.0.0] - 2020-10-11

### :dizzy: Changed

- [BREAKING CHANGE] Renamed method `Discovery.onHello(callback: (device: Device) => void)` to `Discovery.on("hello", (device: Device) => void)`
- [BREAKING CHANGE] Renamed method `Discovery.onGoodbye(callback: (device: Device) => void)` to `Discovery.on("goodbye", (device: Device) => void)`

### :zap: Added

- Class `Discovery` implements `EventEmitter`

## [5.0.6] - 2020-03-09

### :syringe: Fixed

- Add membership to port 1900 might throw error if already in use by another process

## [5.0.5] - 2019-12-27

### :policeman: Security

- Security vulnerability in transient dependency `handlebars`

## [5.0.4] - 2019-07-14

### :policeman: Security

- Security vulnerability in transient dependency `diff`
- Security vulnerability in transient dependency `lodash`

## [5.0.3] - 2019-06-07

### :policeman: Security

- Security vulnerability in transient dependency `handlebars`
- Security vulnerability in transient dependency `js-yaml`

## [5.0.2] - 2019-03-09

### :policeman: Security

- Security vulnerability in transient dependency `sshpk`

## [5.0.1] - 2019-01-07

### :syringe: Fixed

- Update dependencies

## [5.0.0] - 2017-12-22

### :dizzy: Changed

- The property `macAddress` on `Device` changed type from `string | undefined` to `string`. Devices without a MAC address are now omitted from search results.

## [4.1.0] - 2017-11-27

### :zap: Added

- The option to specify a custom implementation of a HTTP client, where the default is based on [Request](https://www.npmjs.com/package/request). This can be useful if discovery is required in an Electron application where one wish to benefit from the proxy configuration provided by using Electron's [net.request](https://electronjs.org/docs/api/net).

## [4.0.2] - 2017-10-14

### :syringe: Fixed

- Issue where exception was thrown when received message didn't specify MAC address

## [4.0.1] - 2017-07-06

### :syringe: Fixed

- Issue where socket listeners remained alive when discovery was stopped

## [4.0.0] - 2017-07-04

### :zap: Added

- Support for enabling logs using [debug](https://github.com/visionmedia/debug)

### :skull: Removed

- Support for Node.js v5 (v6 is LTS)

## [3.0.0] - 2017-06-26

### :dizzy: Changed

- Renamed `Device.serialNumber` to `Device.macAddress`. In most situations they are still the same, but the exceptions are the Axis products which bundle multiple physical devices into a single casing with a shared network interface. Because of the shared network interface they also share the same MAC address. This package is opinionated in that even though the devices via SSDP (UPnP) call the property _serial number_, it actually is a _MAC address_ and should be named accordingly.

## [2.0.0] - 2017-06-24

### :zap: Added

- [#2](https://github.com/FantasticFiasco/axis-discovery-ssdp-js/issues/2) - Calling `Discovery.stop()` stops listening for SSDP advertisements

### :dizzy: Changed

- Replaced `null` with `undefined` according to [TypeScript guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined)

## [1.0.2] - 2017-01-26

### :syringe: Fixed

- [#40](https://github.com/FantasticFiasco/axis-discovery-ssdp-js/issues/40) - Calling `Discovery.search()` didn't trigger a new search

## [1.0.1] - 2016-12-06

### :syringe: Fixed

- Updated `README.md` in package

## [1.0.0] - 2016-12-04

### :zap: Added

- Support for discovering [Axis Communications](http://www.axis.com/) devices on the network using SSDP (UPnP)
