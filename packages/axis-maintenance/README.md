# axis-maintenance

[![npm version](https://img.shields.io/npm/v/axis-maintenance.svg)](https://www.npmjs.com/package/axis-maintenance)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-maintenance-js/status.svg)](https://david-dm.org/FantasticFiasco/axis-maintenance-js)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-maintenance-js/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-maintenance-js?type=dev)

A Node.js library written in TypeScript capable of running maintenance operations on cameras from [Axis Communication](http://www.axis.com).

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [API](#api)

---

## Super simple to use

```javascript
const connection = new Connection(Protocol.Http, '192.168.1.102', 80, 'root', '32naJzkJdZ!7*HK&Dz');
const maintenance = new Maintenance(connection);

// Restart
await maintenance.restart();

// Partial factory default
await maintenance.factoryDefault(FactoryDefaultType.Partial);

// Hard factory default
await maintenance.factoryDefault(FactoryDefaultType.Hard);
```

## Installation

```sh
npm install axis-maintenance
# or
yarn add axis-maintenance
```

## API

### `Maintenance`

The `Maintenance` class is the main class in the package. With it you can start maintenance operations on a camera.

```javascript
/**
 * Class responsible for running maintenance operations on devices from Axis Communication.
 */
class Maintenance {
    /**
     * Restarts the Axis device.
     *
     * The returned promise is resolved when the device accepts the restart request, before
     * disconnecting from the network.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    restart(): Promise<void>;

    /**
     * Resets the Axis device to factory default.
     *
     * The returned promise is resolved when the device accepts the factory default request, before
     * disconnecting from the network.
     * @param type The type of factory default.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    factoryDefault(type: FactoryDefaultType): Promise<void>;
}
```
