# axis-configuration

[![Build Status](https://travis-ci.com/FantasticFiasco/axis-configuration-js.svg?branch=master)](https://travis-ci.com/FantasticFiasco/axis-configuration-js)
[![npm version](https://img.shields.io/npm/v/axis-configuration.svg)](https://www.npmjs.com/package/axis-configuration)
[![SemVer compatible](https://img.shields.io/badge/%E2%9C%85-SemVer%20compatible-blue)](https://semver.org/)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-configuration-js/status.svg)](https://david-dm.org/FantasticFiasco/axis-configuration-js)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-configuration-js/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-configuration-js?type=dev)

A Node.js library written in TypeScript capable of configuring [Axis Communication](http://www.axis.com) cameras.

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Parameters](#parameters)
- [User accounts](#user-accounts)
- [Credit](#credit)

---

## Super simple to use

```javascript
const connection = new Connection(Protocol.Http, '192.168.1.102', 80, 'root', '32naJzkJdZ!7*HK&Dz');

//// Parameters
const parameters = new Parameters(connection);
let root: { [name: string]: string };

// Get parameter
root = await parameters.get('Network.Bonjour.FriendlyName');
// => { 'Network.Bonjour.FriendlyName': 'Some name' }

// Get parameters using wildcard
root = await parameters.get('Network.*.FriendlyName');
// => { 'Network.Bonjour.FriendlyName': 'Some name', 'Network.UPnP.FriendlyName': 'Some name' }

// Get parameter group
root = await parameters.get('Network.Bonjour');
// => { 'Network.Bonjour.FriendlyName': 'Some name', 'Network.Bonjour.Enabled': 'yes' }

// Update parameter
await parameters.update({ 'Network.Bonjour.FriendlyName': 'Some new name' });

// Update parameters
await parameters.update({
    'Network.Bonjour.FriendlyName': 'Some new name',
    'Network.UPnP.FriendlyName': 'Some new name'
});

//// Users
const userAccounts = new UserAccounts(connection);

// Get all user accounts
const users = await userAccounts.getAll();
// => [ User { name: 'root', password: undefined, accessRights: 2, ptz: true } ]

// Add user account
const user = new User('John', 'D2fK$xFpBaxtH@RQ5j', AccessRights.Viewer, true);
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

```javascript
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
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    get(...parameterGroups: string[]): Promise<{ [name: string]: string }>;

    /**
     * Updates parameters with new values.
     * @param parameters An object with parameters named '{group}.{name}' and their corresponding
     * new value.
     * @throws {UpdateParametersError} Updating one or many of the parameters failed.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    update(parameters: { [name: string]: string }): Promise<void>;
}
```

## User accounts

The HTTP-based AXIS camera interface called VAPIX® provides the functionality for adding a new user account with password and group membership, modify the information and remove a user account. The following classes will enable you to focus on the code in your application instead of having to deal with the intricate nature of HTTP requests and responses.

### `UserAccounts`

The `UserAccounts` class exposes all user account related operations on the camera. With it you can add, read, update and remove user accounts. Please note that you need an existing user with administrator access rights to carry out these operations.

```javascript
/**
 * Class responsible for adding a new user account with password and group membership, modify the
 * information and remove a user account.
 */
class UserAccounts {
    /**
     * Adds a new user.
     * @param user The user to add. Please note that the password must be specified.
     * @throws {UserAlreadyExistsError} User already exists.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    add(user: User): Promise<void>;

    /**
     * Gets all users.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    getAll(): Promise<User[]>;

    /**
     * Updates a user.
     * @param user The user to update. Please note that the password must be specified.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    update(user: User): Promise<void>;

    /**
     * Removes a user.
     * @param username The name of the user to remove.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    remove(username: string): Promise<void>;
}
```

### `User`

The `User` class is a immutable description of a user account on the camera.

```javascript
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

## Credit

Thank you [JetBrains](https://www.jetbrains.com/) for your important initiative to support the open source community with free licenses to your products.

![JetBrains](./doc/resources/jetbrains.png)
