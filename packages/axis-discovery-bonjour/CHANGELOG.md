# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [2.0.0] - 2020-10-11

### :dizzy: Changed

- [BREAKING CHANGE] Renamed method `Discovery.onHello(callback: (device: Device) => void)` to `Discovery.on("hello", (device: Device) => void)`
- [BREAKING CHANGE] Renamed method `Discovery.onGoodbye(callback: (device: Device) => void)` to `Discovery.on("goodbye", (device: Device) => void)`

### :zap: Added

- Class `Discovery` implements `EventEmitter`

## [1.0.8] - 2020-03-22

### :dizzy: Changed

- Vendor dependencies [bonjour](https://github.com/FantasticFiasco-Forks/bonjour) and [multicast-dns](https://github.com/FantasticFiasco-Forks/multicast-dns)

## [1.0.7] - 2019-12-27

### :policeman: Security

- Security vulnerability in transient dependency `handlebars`

## [1.0.6] - 2019-10-30

### :syringe: Fixed

- Update dependencies

## [1.0.5] - 2019-07-14

### :policeman: Security

- Security vulnerability in transient dependency `diff`
- Security vulnerability in transient dependency `lodash`

## [1.0.4] - 2019-06-07

### :policeman: Security

- Security vulnerability in transient dependency `handlebars`
- Security vulnerability in transient dependency `js-yaml`

## [1.0.3] - 2019-03-09

### :policeman: Security

- Security vulnerability in transient dependency `sshpk`

## [1.0.2] - 2019-01-07

### :syringe: Fixed

- npm package content

## [1.0.1] - 2019-01-07

### :syringe: Fixed

- Update dependencies

## [1.0.0] - 2017-07-14

### :zap: Added

- Support for discovering [Axis Communications](http://www.axis.com/) devices on the network using Bonjour
