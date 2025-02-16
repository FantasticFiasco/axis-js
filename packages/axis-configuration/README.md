<!-- omit in toc -->
# axis-configuration

[![axis-configuration](https://github.com/FantasticFiasco/axis-js/actions/workflows/axis-configuration.yml/badge.svg)](https://github.com/FantasticFiasco/axis-js/actions/workflows/axis-configuration.yml)
[![npm version](https://img.shields.io/npm/v/axis-configuration.svg)](https://www.npmjs.com/package/axis-configuration)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)

A Node.js library written in TypeScript capable of configuring [Axis Communication](http://www.axis.com) cameras.

<!-- omit in toc -->
## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Parameters](#parameters)
  - [`Parameters`](#parameters-1)
- [User accounts](#user-accounts)
  - [`UserAccounts`](#useraccounts)
  - [`User`](#user)

---

## Super simple to use

```typescript
const connection = new Connection(Protocol.Http, '<ip address>', 80, '<username>', '<password>');

//// Parameters
const parameters = new Parameters(connection);

// Get parameter
let root = await parameters.get(['Network.Bonjour.FriendlyName']);
// => { 'Network.Bonjour.FriendlyName': 'Some name' }

// Get parameters using wildcard
root = await parameters.get(['Network.*.FriendlyName']);
// => { 'Network.Bonjour.FriendlyName': 'Some name', 'Network.UPnP.FriendlyName': 'Some name' }

// Get parameter group
root = await parameters.get(['Network.Bonjour']);
// => { 'Network.Bonjour.FriendlyName': 'Some name', 'Network.Bonjour.Enabled': 'yes' }

// Update parameter
await parameters.update(
  new Map<string, string>([
    ['Network.Bonjour.FriendlyName': 'Some new name'],
  ])
);

// Update parameters
await parameters.update(
  new Map<string, string>([
    ['Network.Bonjour.FriendlyName': 'Some new name'],
    ['Network.UPnP.FriendlyName': 'Some new name'],
  ])
);

//// Users
const userAccounts = new UserAccounts(connection);

// Get all user accounts
const users = await userAccounts.getAll();
// => [ User { name: 'root', password: undefined, accessRights: 2, ptz: true } ]

// Add user account
const user = new User('<username>', '<password>', AccessRights.Viewer, true);
await userAccounts.add(user);

// Update user account
const promotion = new User(user.name, user.password, AccessRights.Operator, user.ptz);
await userAccounts.update(promotion);

// Remove user account
await userAccounts.remove(user.name);
```

## Installation

```sh
npm install axis-configuration
# or
yarn add axis-configuration
```

## Prerequisites

The library support cameras with the following characteristics:

- __Property__: `Properties.API.HTTP.Version=3`
- __Firmware__: 5.00 and later

## Parameters

The HTTP-based Axis camera interface called VAPIX® provides the functionality for getting and setting internal parameter values. The following classes will enable you to focus on the code in your application instead of having to deal with the intricate nature of HTTP requests and responses.

### `Parameters`

The `Parameters` class exposes parameter related operations on the camera. With it you can read and write parameters. Please note that the parameters you can read and write depend on the access rights of the user you specify to carry out these operations.

```typescript
/**
 * Class responsible getting and setting non-dynamic parameter values. Non-dynamic parameters are
 * pre-configured and already exist in your Axis product. A non-dynamic parameter has one or more
 * values. Some non-dynamic parameters are configurable and some are read only.
 */
class Parameters {
    /**
     * Gets parameters and their current values.
     * @param parameterGroups A sequence of parameters named '{group}.{name}'. If {name} is
     * omitted, all the parameters of the {group} are returned. Wildcard (*) can be used filter
     * parameters. E.g. 'Network.*.FriendlyName' will return the two parameters
     * 'Network.Bonjour.FriendlyName' and 'Network.SSDP.FriendlyName'.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    get(parameterGroups: string[], init?: RequestInit): Promise<Map<string, string>>

    /**
     * Updates parameters with new values.
     * @param parameters An object with parameters named '{group}.{name}' and their corresponding
     * new value.
     * @param init The object containing any custom settings that you want to apply to the request.
     * @throws {UpdateParametersError} Updating one or many of the parameters failed.
     */
    update(parameters: Map<string, string>, init?: RequestInit): Promise<void>
}
```

## User accounts

The HTTP-based AXIS camera interface called VAPIX® provides the functionality for adding a new user account with password and group membership, modify the information and remove a user account. The following classes will enable you to focus on the code in your application instead of having to deal with the intricate nature of HTTP requests and responses.

### `UserAccounts`

The `UserAccounts` class exposes all user account related operations on the camera. With it you can add, read, update and remove user accounts. Please note that you need an existing user with administrator access rights to carry out these operations.

```typescript
/**
 * Class responsible for adding a new user account with password and group membership, modify the
 * information and remove a user account.
 */
class UserAccounts {
    /**
     * Adds a new user.
     * @param user The user to add. Please note that the password must be specified.
     * @param init The object containing any custom settings that you want to apply to the request.
     * @throws {UserAlreadyExistsError} User already exists.
     */
    add(user: User, init?: RequestInit): Promise<void>

    /**
     * Gets all users.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    getAll(init?: RequestInit): Promise<User[]>

    /**
     * Updates a user.
     * @param user The user to update. Please note that the password must be specified.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    update(user: User, init?: RequestInit): Promise<void>

    /**
     * Removes a user.
     * @param username The name of the user to remove.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    remove(username: string, init?: RequestInit): Promise<void>
}
```

### `User`

The `User` class is a immutable description of a user account on the camera.

```typescript
/**
 * Class describing a user.
 */
class User {
    /**
     * The user account name (1-14 characters). Valid characters are a-z, A-Z and 0-9.
     */
    readonly name: string;

    /**
     * The unencrypted password (1-64 characters) for the account. ASCII characters from
     * character code 32 to 126 are valid.
     */
    readonly password: string | undefined;

    /**
     * The access rights for the user.
     */
    readonly accessRights: AccessRights;

    /**
     * Whether user has access rights for PTZ control.
     */
    readonly ptz: boolean;
}
```
