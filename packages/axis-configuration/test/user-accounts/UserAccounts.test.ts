import { ExpectationError } from '@fantasticfiasco/expect';
import { Connection, Protocol } from 'axis-core';
import { AccessRights, User, UserAccounts, UserAlreadyExistsError } from '../../src';
import { DeviceMock } from '../DeviceMock';

let device: DeviceMock;

beforeAll(async () => {
    device = new DeviceMock();
    await device.listen('127.0.0.1', 0);
});

afterAll(async () => {
    await device.close();
});

describe('users', () => {
    describe('#add', () => {
        test('should add user with viewer access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', 'secret', AccessRights.Viewer, false);

            // Act
            await userAccounts.add(user);
        });

        test('should add user with viewer and PTZ access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', 'secret', AccessRights.Viewer, true);

            // Act
            await userAccounts.add(user);
        });

        test('should add user with operator access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', 'secret', AccessRights.Operator, false);

            // Act
            await userAccounts.add(user);
        });

        test('should add user with operator and PTZ access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', 'secret', AccessRights.Operator, true);

            // Act
            await userAccounts.add(user);
        });

        test('should add user with administrator access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', 'secret', AccessRights.Administrator, false);

            // Act
            await userAccounts.add(user);
        });

        test('should add user with administrator and PTZ access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', 'secret', AccessRights.Administrator, true);

            // Act
            await userAccounts.add(user);
        });

        test('should throw exception if password is omitted', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', undefined, AccessRights.Viewer, false);

            // Act
            const fn = () => userAccounts.add(user);

            // Assert
            await expect(fn()).rejects.toThrow(ExpectationError);
        });

        test('should throw exception if user already exists', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('root', 'secret', AccessRights.Viewer, false);

            // Act
            const fn = () => userAccounts.add(user);

            // Assert
            await expect(fn()).rejects.toThrow(UserAlreadyExistsError);
        });

        // test('should throw exception if device is unresponsive', async () => {
        //     // Arrange
        //     const user = new User('new', 'secret', AccessRights.Viewer, false);

        //     // nock(connection.url)
        //     //     .get(/pwdgrp.cgi\?action=add/)
        //     //     .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

        //     try {
        //         // Act
        //         await userAccounts.add(user);
        //         throw new Error('This exception should not be thrown');
        //     } catch (error) {
        //         // Assert
        //         expect(error).toBeInstanceOf(Error);
        //     }
        // });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            const connection = createConnection('wrong-password');
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', 'secret', AccessRights.Viewer, false);

            // Act
            const fn = () => userAccounts.add(user);

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });
    });

    describe('#getAll', () => {
        test('should get users', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            // Act
            const got = await userAccounts.getAll();

            // Assert
            const want = [
                new User('root', undefined, AccessRights.Administrator, true),
                new User('admin', undefined, AccessRights.Administrator, false),
                new User('adminptz', undefined, AccessRights.Administrator, true),
                new User('operator', undefined, AccessRights.Operator, false),
                new User('operatorptz', undefined, AccessRights.Operator, true),
                new User('viewer', undefined, AccessRights.Viewer, false),
                new User('viewerptz', undefined, AccessRights.Viewer, true),
            ];
            expect(got).toStrictEqual(want);
        });

        //     test('should throw exception if device is unresponsive', async () => {
        //         // Arrange
        //         // nock(connection.url)
        //         //     .get(/pwdgrp.cgi\?action=get/)
        //         //     .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);
        //         try {
        //             // Act
        //             await userAccounts.getAll();
        //             throw new Error('This exception should not be thrown');
        //         } catch (error) {
        //             // Assert
        //             expect(error).toBeInstanceOf(Error);
        //         }
        //     });
        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            const connection = createConnection('wrong-password');
            const userAccounts = new UserAccounts(connection);

            // Act
            const fn = () => userAccounts.getAll();

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });
    });

    describe('#update', () => {
        test('should update user with viewer access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('root', 'secret', AccessRights.Viewer, false);

            // Act
            await userAccounts.update(user);
        });

        test('should update user with viewer and PTZ access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('root', 'secret', AccessRights.Viewer, true);

            // Act
            await userAccounts.update(user);
        });

        test('should update user with operator access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('root', 'secret', AccessRights.Operator, false);

            // Act
            await userAccounts.update(user);
        });

        test('should update user with operator and PTZ access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('root', 'secret', AccessRights.Operator, true);

            // Act
            await userAccounts.update(user);
        });

        test('should update user with administrator access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('root', 'secret', AccessRights.Administrator, false);

            // Act
            await userAccounts.update(user);
        });

        test('should update user with administrator and PTZ access', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('root', 'secret', AccessRights.Administrator, true);

            // Act
            await userAccounts.update(user);
        });

        test('should throw exception if user does not exist', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            const user = new User('new', 'secret', AccessRights.Viewer, false);

            // Act
            const fn = () => userAccounts.update(user);

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });

        //     test('should throw exception if device is unresponsive', async () => {
        //         // Arrange
        //         const user = new User('root', 'secret', AccessRights.Viewer, false);
        //         // nock(connection.url)
        //         //     .get(/pwdgrp.cgi\?action=update/)
        //         //     .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);
        //         try {
        //             // Act
        //             await userAccounts.update(user);
        //             throw new Error('This exception should not be thrown');
        //         } catch (error) {
        //             // Assert
        //             expect(error).toBeInstanceOf(Error);
        //         }
        //     });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            const connection = createConnection('wrong-password');
            const userAccounts = new UserAccounts(connection);

            const user = new User('root', 'secret', AccessRights.Viewer, false);

            // Act
            const fn = () => userAccounts.update(user);

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });
    });

    describe('#remove', () => {
        test('should remove user', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            // Act
            await userAccounts.remove('root');
        });

        test('should throw exception if user does not exist', async () => {
            // Arrange
            const connection = createConnection();
            const userAccounts = new UserAccounts(connection);

            // Act
            const fn = () => userAccounts.remove('new');

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });

        //     test('should throw exception if device is unresponsive', async () => {
        //         // Arrange
        //         // nock(connection.url)
        //         //     .get(/pwdgrp.cgi\?action=remove/)
        //         //     .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);
        //         try {
        //             // Act
        //             await userAccounts.remove('root');
        //             throw new Error('This exception should not be thrown');
        //         } catch (error) {
        //             // Assert
        //             expect(error).toBeInstanceOf(Error);
        //         }
        //     });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            const connection = createConnection('wrong-password');
            const userAccounts = new UserAccounts(connection);

            // Act
            const fn = () => userAccounts.remove('root');

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });
    });
});

const createConnection = (password: string | undefined = undefined): Connection => {
    const { protocol, hostname, port } = new URL(device.uri);

    if (protocol !== 'http:') {
        throw new Error('Tests are currently not written to support anything else than HTTP');
    }

    const connection = new Connection(Protocol.Http, hostname, Number.parseInt(port), device.username, password ?? device.password);
    return connection;
};
