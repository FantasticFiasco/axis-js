<!-- omit in toc -->
# axis-core

[![axis-core](https://github.com/FantasticFiasco/axis-js/actions/workflows/axis-core.yml/badge.svg)](https://github.com/FantasticFiasco/axis-js/actions/workflows/axis-core.yml)
[![npm version](https://img.shields.io/npm/v/axis-core.svg)](https://www.npmjs.com/package/axis-core)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)

A Node.js library written in TypeScript containing shared behavior for the other packages, e.g. code handling communication and authentication with [Axis Communication](http://www.axis.com) cameras.

<!-- omit in toc -->
## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [API](#api)
  - [`Connection`](#connection)
  - [`fetchBuilder`](#fetchbuilder)

---

## Super simple to use

```typescript
// fetchBuilder is building a version of fetch that can handle the
// authentication protocols used by Axis devices.
const fetch = fetchBuilder(global.fetch);

// This package is exporting utility classes and methods. In this case we rely
// on DeviceRequest to build a request that is reading the product short name.
class GetProdShortNameRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection, '/axis-cgi/param.cgi?action=list&group=Brand.ProdShortName');
    }
}

// This is a custom response handler that reads the response body and extracts
// the parameter name and value from the text.
const responseHandler = async (res: Response): Promise<{ name: string; value: string }> => {
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status} ${res.statusText}`);
    }

    // text/plain;charset=UTF-8
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'text/plain') {
        throw new Error(`Response with invalid content type: ${contentType}`);
    }

    const text = await res.text();
    const [name, value] = text.trim().split('=');

    return { name, value };
};

// This code is creating a connection to a device and sending a request to read
// the product short name. The response is then handled by the custom response
// handler.
const connection = new Connection(Protocol.Http, '<ip address>', 80, '<username>', '<password>');

const req = new GetProdShortNameRequest(connection);
const res = await fetch(req);

const { name, value } = await responseHandler(res);

console.log(`Status:     ${res.status}`);
console.log(`Parameter:  ${name}=${value}`);
```

## Installation

```sh
npm install axis-core
# or
yarn add axis-core
```

## API

### `Connection`

The `Connection` class encapsulates all information needed in order to start communicating with a camera on the network.

```typescript
/**
 * Class describing a connection to a device.
 */
class Connection {
    /**
     * Gets the protocol to use when creating the connection.
     */
    readonly protocol: Protocol;

    /**
     * Gets the address or hostname of the device.
     */
    readonly address: string;

    /**
     * Gets the port of the device.
     */
    readonly port: number;

    /**
     * Gets the username.
     */
    readonly username: string;

    /**
     * Gets the password.
     */
    readonly password: string;

    /**
     * Gets the url.
     */
    get url(): string;
}

enum Protocol {
    /**
     * Hypertext Transfer Protocol (HTTP).
     */
    Http = 0,

    /**
     * HTTP over Transport Layer Security (TLS).
     */
    Https = 1
}
```

### `fetchBuilder`

The `fetchBuilder` function builds a version of `fetch` that can authenticates with the camera using either [Basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) or [Digest access authentication](https://en.wikipedia.org/wiki/Digest_access_authentication), depending on the camera configuration.

```typescript
type Fetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
type DeviceFetch = (input: DeviceRequest, init?: RequestInit) => Promise<Response>;

const fetchBuilder = (fetch: Fetch): DeviceFetch
```
