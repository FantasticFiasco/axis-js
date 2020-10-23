# axis-discovery-bonjour

[![Build Status](https://travis-ci.com/FantasticFiasco/axis-discovery-bonjour-js.svg?branch=master)](https://travis-ci.com/FantasticFiasco/axis-discovery-bonjour-js)
[![Coverage Status](https://coveralls.io/repos/github/FantasticFiasco/axis-discovery-bonjour-js/badge.svg)](https://coveralls.io/github/FantasticFiasco/axis-discovery-bonjour-js)
[![npm version](https://img.shields.io/npm/v/axis-discovery-bonjour.svg)](https://www.npmjs.com/package/axis-discovery-bonjour)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour-js/status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour-js)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour-js/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour-js?type=dev)

A Node.js Bonjour client library written in TypeScript capable of searching for [Axis Communication](http://www.axis.com) cameras.

To also find cameras on the network using SSDP (UPnP), please see [axis-discovery](https://github.com/FantasticFiasco/axis-discovery-js).

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [Family of packages](#family-of-packages)
- [API](#api)
- [Credit](#credit)

---

## Super simple to use

```javascript
import * as bonjour from 'axis-discovery-bonjour';

const discovery = new bonjour.Discovery();

discovery.on('hello', (device: bonjour.Device) => {
    console.log(`Hello from ${device.address}`);
});

discovery.on('goodbye', (device: bonjour.Device) => {
    console.log(`Goodbye from ${device.address}`);
});

discovery.start();
discovery.search();
```

## Installation

```sh
npm install axis-discovery-bonjour
# or
yarn add axis-discovery-bonjour
```

## Family of packages

The following NPM packages have been created to provide a smooth experience with devices from Axis Communications.

- [axis-discovery](https://github.com/FantasticFiasco/axis-discovery-js) - A Node.js client library written in TypeScript capable of searching for Axis Communication cameras using Bonjour and SSDP (UPnP).
    - `axis-discovery-bonjour` - This package
    - [axis-discovery-ssdp](https://github.com/FantasticFiasco/axis-discovery-ssdp-js) - A Node.js SSDP (UPnP) client library written in TypeScript capable of searching for Axis Communication cameras.
- [axis-configuration](https://github.com/FantasticFiasco/axis-configuration-js) - A Node.js library written in TypeScript capable of configuring Axis Communication cameras.
- [axis-maintenance](https://github.com/FantasticFiasco/axis-maintenance-js) - A Node.js library written in TypeScript capable of running maintenance operations on cameras from Axis Communication.
- [axis-snapshot](https://github.com/FantasticFiasco/axis-snapshot-js) - A Node.js library written in TypeScript capable of getting snapshots from Axis Communication cameras.

## API

### `Discovery`

The `Discovery` class is the main class in the package. With it you can register for changes to cameras on the network and respond accordingly when a camera is found on, or intentionally disconnects from, the network.

```javascript
class Discovery implements EventEmitter {
    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    start(): void;

    /**
     * Stop listening for device advertisements.
     */
    stop(): void;

    /**
     * Triggers a new search for devices on the network.
     */
    search(): void;

    /**
     * Adds the listener function to the end of the listeners array for the event named eventName.
     * No checks are made to see if the listener has already been added. Multiple calls passing the
     * same combination of eventName and listener will result in the listener being added, and
     * called, multiple times.
     * @param eventName The name of the event.
     * @param listener The callback function.
     */
    on(eventName: 'hello' | 'goodbye', listener: (device: Device) => void): this;

    // The remaining implementation of EventEmitter has been removed for brevity
}
```

### `Device`

The `Device` class is a immutable description of a camera on the network.

```javascript
/**
 * Class describing a device on the network.
 */
class Device {
    /**
     * Gets the address.
     */
    readonly address: string;

    /**
     * Gets the link local address.
     * For more information regarding link local addresses, please see
     * [Wikipedia]{@link https://wikipedia.org/wiki/Link-local_address}.
     */
    readonly linkLocalAddress: string;

    /**
     * Gets the port.
     */
    readonly port: number;

    /**
     * Gets the MAC address. In most situations this is identical to the
     * serial number. The exceptions are the Axis products which bundle
     * multiple physical devices into a single casing with a shared network
     * interface. Because of the shared network interface they also share
     * the same MAC address.
     */
    readonly macAddress: string;

    /**
     * Gets the short description for the end user.
     */
    readonly friendlyName: string;
}

```

## Credit

Thank you [JetBrains](https://www.jetbrains.com/) for your important initiative to support the open source community with free licenses to your products.

![JetBrains](./doc/resources/jetbrains.png)
