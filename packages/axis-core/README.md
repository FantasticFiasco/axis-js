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
  - [`get`](#get)

---

## Super simple to use

```typescript
const connection = new Connection(Protocol.Http, '<ip address>', 80, 'root', '<password>');
const res: Response = await get(connection, '/axis-cgi/param.cgi?action=list&group=Brand.ProdShortName');

console.log('Status code:', res.statusCode);
console.log('Headers:', res.headers);
console.log('Body:', res.body);
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
     * Gets the options for the connection to the device.
     */
    readonly options?: Options | undefined;

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

interface Options {
    /**
     * The HTTP or HTTPS agent used when opening the connection.
     */
    agent?: http.Agent | https.Agent;
}
```

### `get`

The function `get` sends a HTTP/HTTPS GET request over the network to a camera described by the `connection` parameter.

The function automatically authenticates with the camera using either [Basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) or [Digest access authentication](https://en.wikipedia.org/wiki/Digest_access_authentication), depending on the camera configuration.

```typescript
const get: (connection: Connection, relativePath: string) => Promise<Response>;

interface Response {
    /**
     * The HTTP status code.
     */
    statusCode: number;

    /**
     * The response headers.
     */
    headers: NodeJS.Dict<string | string[]>;

    /**
     * The response body.
     */
    body: Buffer;
}

```
