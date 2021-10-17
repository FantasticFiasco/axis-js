# axis-snapshot

[![axis-snapshot](https://github.com/FantasticFiasco/axis-js/actions/workflows/axis-snapshot.yml/badge.svg)](https://github.com/FantasticFiasco/axis-js/actions/workflows/axis-snapshot.yml)
[![npm version](https://img.shields.io/npm/v/axis-snapshot.svg)](https://www.npmjs.com/package/axis-snapshot)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)

A Node.js library written in TypeScript capable of getting snapshots from [Axis Communication](http://www.axis.com) cameras.

## Table of contents

- [axis-snapshot](#axis-snapshot)
  - [Table of contents](#table-of-contents)
  - [Super simple to use](#super-simple-to-use)
  - [Installation](#installation)
  - [API](#api)
    - [`Snapshot`](#snapshot)

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
