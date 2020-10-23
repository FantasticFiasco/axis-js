# axis-snapshot

[![Build Status](https://travis-ci.com/FantasticFiasco/axis-snapshot-js.svg?branch=master)](https://travis-ci.com/FantasticFiasco/axis-snapshot-js)
[![Coverage Status](https://coveralls.io/repos/github/FantasticFiasco/axis-snapshot-js/badge.svg)](https://coveralls.io/github/FantasticFiasco/axis-snapshot-js)
[![npm version](https://img.shields.io/npm/v/axis-snapshot.svg)](https://www.npmjs.com/package/axis-snapshot)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-snapshot-js/status.svg)](https://david-dm.org/FantasticFiasco/axis-snapshot-js)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-snapshot-js/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-snapshot-js?type=dev)

A Node.js library written in TypeScript capable of getting snapshots from [Axis Communication](http://www.axis.com) cameras.

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [Family of packages](#family-of-packages)
- [API](#api)
- [Credit](#credit)

---

## Super simple to use

```javascript
import { writeFileSync } from 'fs';
import { Connection, Protocol, Snapshot } from 'axis-snapshot';

const connection = new Connection(Protocol.Http, '192.168.1.102', 80, 'root', '32naJzkJdZ!7*HK&Dz');
const snapshot = new Snapshot(connection);

snapshot.jpeg({ compression: 20, rotation: 180 })
  .then((image: Buffer) => writeFileSync('snapshot.jpeg', image));
```

## Installation

```sh
npm install axis-snapshot
# or
yarn add axis-snapshot
```

## Family of packages

The following NPM packages have been created to provide a smooth experience with devices from Axis Communications.

- [axis-discovery](https://github.com/FantasticFiasco/axis-discovery-js) - A Node.js client library written in TypeScript capable of searching for Axis Communication cameras using Bonjour and SSDP (UPnP).
    - [axis-discovery-bonjour](https://github.com/FantasticFiasco/axis-discovery-bonjour-js) - A Node.js Bonjour client library written in TypeScript capable of searching for Axis Communication cameras.
    - [axis-discovery-ssdp](https://github.com/FantasticFiasco/axis-discovery-ssdp-js) - A Node.js SSDP (UPnP) client library written in TypeScript capable of searching for Axis Communication cameras.
- [axis-configuration](https://github.com/FantasticFiasco/axis-configuration-js) - A Node.js library written in TypeScript capable of configuring [Axis Communication](http://www.axis.com) cameras.
- [axis-maintenance](https://github.com/FantasticFiasco/axis-maintenance-js) - A Node.js library written in TypeScript capable of running maintenance operations on cameras from Axis Communication.
- `axis-snapshot` - This package

## API

### `Snapshot`

The `Snapshot` class is the main class in the package. With it you take [BMP](https://wikipedia.org/wiki/BMP_file_format) and [JPEG](https://en.wikipedia.org/wiki/JPEG) snapshots given that the operations are supported by the camera.

```javascript
class Snapshot {
    /**
     * Takes a {link https://wikipedia.org/wiki/BMP_file_format|BMP} snapshot from the camera.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    bmp(options?: SnapshotOptions): Promise<Buffer>;

    /**
     * Takes a {link https://en.wikipedia.org/wiki/JPEG|JPEG} snapshot from the camera.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    jpeg(options?: SnapshotOptions): Promise<Buffer>;
}
```

## Credit

Thank you [JetBrains](https://www.jetbrains.com/) for your important initiative to support the open source community with free licenses to your products.

![JetBrains](./doc/resources/jetbrains.png)
