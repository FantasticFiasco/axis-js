<!-- omit in toc -->
# axis-maintenance

[![axis-maintenance](https://github.com/FantasticFiasco/axis-js/actions/workflows/axis-maintenance.yml/badge.svg)](https://github.com/FantasticFiasco/axis-js/actions/workflows/axis-maintenance.yml)
[![npm version](https://img.shields.io/npm/v/axis-maintenance.svg)](https://www.npmjs.com/package/axis-maintenance)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)

A Node.js library written in TypeScript capable of running maintenance operations on cameras from [Axis Communication](http://www.axis.com).

<!-- omit in toc -->
## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [API](#api)
  - [`Maintenance`](#maintenance)

---

## Super simple to use

```typescript
const connection = new Connection(Protocol.Http, '<ip address>', 80, '<username>', '<password>');
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

```typescript
/**
 * Class responsible for running maintenance operations on devices from Axis Communication.
 */
class Maintenance {
    /**
     * Restarts the Axis device.
     *
     * The returned promise is resolved when the device accepts the restart request, before
     * disconnecting from the network.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    restart(init?: RequestInit): Promise<void>

    /**
     * Resets the Axis device to factory default.
     *
     * The returned promise is resolved when the device accepts the factory default request, before
     * disconnecting from the network.
     * @param type The type of factory default.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    factoryDefault(type: FactoryDefaultType, init?: RequestInit): Promise<void>
}

enum FactoryDefaultType {
    /**
     * All settings, except the following, are set to their factory default values:
     *
     * - The boot protocol (Network.BootProto)
     * - The static IP address (Network.IPAddress)
     * - The default router (Network.DefaultRouter)
     * - The subnet mask (Network.SubnetMask)
     * - The broadcast IP address (Network.Broadcast)
     * - The system time
     * - The IEEE 802.1X settings
     *
     * Since these parameters are not reset the Axis product can be accessed on the same address.
     * This is especially important when using NAT router. After the Axis product has been reset to
     * factory default it is restarted as part of this function.
     */
    Partial,

    /**
     * All settings, including the IP addresses, are set to their factory default values. After the
     * Axis product has been reset to factory default it is restarted as part of this function.
     */
    Hard,
}
```
