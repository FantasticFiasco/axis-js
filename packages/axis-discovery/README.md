# axis-discovery

[![Build Status](https://travis-ci.com/FantasticFiasco/axis-discovery-js.svg?branch=master)](https://travis-ci.com/FantasticFiasco/axis-discovery-js)
[![Coverage Status](https://coveralls.io/repos/github/FantasticFiasco/axis-discovery-js/badge.svg?branch=master)](https://coveralls.io/github/FantasticFiasco/axis-discovery-js?branch=master)
[![npm version](https://img.shields.io/npm/v/axis-discovery.svg)](https://www.npmjs.com/package/axis-discovery)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-js/status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-js)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-js/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-js?type=dev)

A Node.js client library written in TypeScript capable of searching for Axis Communication cameras using Bonjour and SSDP (UPnP).

It utilizes [axis-discovery-bonjour](https://github.com/FantasticFiasco/axis-discovery-bonjour-js) and [axis-discovery-ssdp](https://github.com/FantasticFiasco/axis-discovery-ssdp-js) for discovery, and aggregates the information provided by the protocols into a convenient way for clients to find cameras on the network.

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [API](#api)
- [Credit](#credit)

---

## Super simple to use

```javascript
import * as axis from 'axis-discovery';

const discovery = new axis.Discovery();

discovery.onHello((device: axis.Device) => {
    console.log(`Hello from ${device.address}`);
});

discovery.onGoodbye((device: axis.Device) => {
    console.log(`Goodbye from ${device.address}`);
});

await discovery.start();
await discovery.search();
```

## Installation

```sh
npm install axis-discovery axis-discovery-bonjour axis-discovery-ssdp
# or
yarn add axis-discovery axis-discovery-bonjour axis-discovery-ssdp
```

`axis-discovery-bonjour` and `axis-discovery-ssdp` are defined as a peer-dependencies and thus have to be installed separately.

## API

### `Discovery`

The `Discovery` class is the main class in the package. With it you can register for changes to cameras on the network and respond accordingly when a camera is found on, or intentionally disconnects from, the network.

```javascript
class Discovery {
    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    start(): Promise<void>;

    /**
     * Stop listening for device advertisements.
     */
    stop(): Promise<void>;

    /**
     * Triggers a new search for devices on the network.
     */
    search(): Promise<void>;

    /**
     * Register a callback that is invoked when a device is found on the
     * network.
     */
    onHello(callback: (device: Device) => void): void;

    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    onGoodbye(callback: (device: Device) => void): void;
}
```

### `Device`

The `Device` class is a immutable description of a camera on the network.

```javascript
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
    readonly linkLocalAddress: string | undefined;

    /**
     * Gets the port.
     */
    readonly port: number | undefined;

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
    readonly friendlyName: string | undefined;

    /**
     * Gets the model name.
     */
    readonly modelName: string | undefined;

    /**
     * Gets the long model description for the end user.
     */
    readonly modelDescription: string | undefined;

    /**
     * Gets the model number.
     */
    readonly modelNumber: string | undefined;

    /**
     * Gets the URL to the web page of the device.
     */
    readonly presentationURL: string | undefined;
}
```

## Credit

Thank you [JetBrains](https://www.jetbrains.com/) for your important initiative to support the open source community with free licenses to your products.

![JetBrains](./doc/resources/jetbrains.png)
