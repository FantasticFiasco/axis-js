# axis-discovery-ssdp

[![npm version](https://img.shields.io/npm/v/axis-discovery-ssdp.svg)](https://www.npmjs.com/package/axis-discovery-ssdp)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-ssdp-js/status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-ssdp-js)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-ssdp-js/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-ssdp-js?type=dev)

A Node.js SSDP (UPnP) client library written in TypeScript capable of searching for [Axis Communication](http://www.axis.com) cameras.

To also find cameras on the network using Bonjour, please see [axis-discovery](https://github.com/FantasticFiasco/axis-js/tree/master/packages/axis-discovery).

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [Who is using it?](#who-is-using-it)
- [API](#api)

---

## Super simple to use

```javascript
import * as ssdp from 'axis-discovery-ssdp';

const discovery = new ssdp.Discovery();

discovery.on('hello', (device: ssdp.Device) => {
    console.log(`Hello from ${device.address}`);
});

discovery.on('goodbye', (device: ssdp.Device) => {
    console.log(`Goodbye from ${device.address}`);
});

await discovery.start();
await discovery.search();
```

## Installation

```sh
npm install axis-discovery-ssdp
# or
yarn add axis-discovery-ssdp
```

## Who is using it?

The application [Searchlight](https://fantasticfiasco.github.io/searchlight/) is depending on this package to find Axis cameras on the network using SSDP. Download and give it a spin!

## API

### `Discovery`

The `Discovery` class is the main class in the package. With it you can register for changes to cameras on the network and respond accordingly when a camera is found on, or intentionally disconnects from, the network.

```javascript
class Discovery {
    /**
     * Initializes a new instance of the class.
     * @param options The SSDP discovery options.
     */
    constructor(options?: IOptions);

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
class Device {
    /**
     * Gets the address.
     */
    readonly address: string;

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
    readonly macAddress: string | undefined;

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

### `Options`

The `Options` class can be specified to configure SSDP discovery.

```javascript
/**
 * The SSDP discovery options.
 */
export interface IOptions {
    /**
     * An implementation of a HTTP client. Default value is based
     * on <a href="https://www.npmjs.com/package/request">Request</a> but a
     * custom implementation can be provided. This can be useful if discovery
     * is required in an Electron application where one wish to benefit from
     * the proxy configuration provided by using Electron's
     * <a href="https://electronjs.org/docs/api/net">net.request</a>.
     */
    httpClient?: IHttpClient;
}

/**
 * Interface responsible for HTTP communication on the network.
 */
export interface IHttpClient {
    /**
     * Send GET request over the network.
     * @param url Fully qualified URL.
     * @returns Promise with response body.
     */
    get(url: string): Promise<string>;
}
```
