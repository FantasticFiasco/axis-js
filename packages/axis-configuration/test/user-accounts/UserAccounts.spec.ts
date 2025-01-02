import { ExpectationError } from '@fantasticfiasco/expect';
import { Connection, Protocol } from 'axis-core';
import { AccessRights, User, UserAccounts, UserAlreadyExistsError } from '../../src';
import { Generate } from './Generate';
import {
    ROOT_AND_JOHN_THE_ADMINISTRATOR_WITHOUT_PTZ,
    ROOT_AND_JOHN_THE_ADMINISTRATOR_WITH_PTZ,
    ROOT_AND_JOHN_THE_OPERATOR_WITHOUT_PTZ,
    ROOT_AND_JOHN_THE_OPERATOR_WITH_PTZ,
    ROOT_AND_JOHN_THE_VIEWER_WITHOUT_PTZ,
    ROOT_AND_JOHN_THE_VIEWER_WITH_PTZ,
} from './request-response/GetUsersResponse.mock';

describe('users', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');
    const userAccounts = new UserAccounts(connection);

    afterEach(() => {
        nock.cleanAll();
    });

    describe('#add', () => {
        test('should add user with viewer access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, false);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .reply(200, Generate.html(`Created account ${user.name}.`));

            // Act
            await userAccounts.add(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should add user with viewer and PTZ access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, true);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .reply(200, Generate.html(`Created account ${user.name}.`));

            // Act
            await userAccounts.add(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should add user with operator access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Operator, false);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .reply(200, Generate.html(`Created account ${user.name}.`));

            // Act
            await userAccounts.add(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should add user with operator and PTZ access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Operator, true);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .reply(200, Generate.html(`Created account ${user.name}.`));

            // Act
            await userAccounts.add(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should add user with administrator access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Administrator, false);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .reply(200, Generate.html(`Created account ${user.name}.`));

            // Act
            await userAccounts.add(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should add user with administrator and PTZ access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Administrator, true);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .reply(200, Generate.html(`Created account ${user.name}.`));

            // Act
            await userAccounts.add(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should throw exception if password is omitted', async () => {
            // Arrange
            const user = new User('Joe', undefined, AccessRights.Viewer, false);

            try {
                // Act
                await userAccounts.add(user);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(ExpectationError);
            }
        });

        test('should throw exception if user already exists', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .reply(200, Generate.html('Error: this user name already exists, consult the system log file'));

            try {
                // Act
                await userAccounts.add(user);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UserAlreadyExistsError);
            }
        });

        test('should throw exception if device is unresponsive', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

            try {
                // Act
                await userAccounts.add(user);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=add/)
                .reply(401);

            try {
                // Act
                await userAccounts.add(user);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });
    });

    describe('#getAll', () => {
        test('should get user with viewer access', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, ROOT_AND_JOHN_THE_VIEWER_WITHOUT_PTZ);

            // Act
            const got = await userAccounts.getAll();

            // Assert
            expect(got.length).toBe(2);
            expect(got[0].name).toBe('root');
            expect(got[0].accessRights).toBe(AccessRights.Administrator);
            expect(got[0].ptz).toBe(true);
            expect(got[1].name).toBe('John');
            expect(got[1].accessRights).toBe(AccessRights.Viewer);
            expect(got[1].ptz).toBe(false);
        });

        test('should get user with viewer and PTZ access', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, ROOT_AND_JOHN_THE_VIEWER_WITH_PTZ);

            // Act
            const got = await userAccounts.getAll();

            // Assert
            expect(got.length).toBe(2);
            expect(got[0].name).toBe('root');
            expect(got[0].accessRights).toBe(AccessRights.Administrator);
            expect(got[0].ptz).toBe(true);
            expect(got[1].name).toBe('John');
            expect(got[1].accessRights).toBe(AccessRights.Viewer);
            expect(got[1].ptz).toBe(true);
        });

        test('should get user with operator access', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, ROOT_AND_JOHN_THE_OPERATOR_WITHOUT_PTZ);

            // Act
            const got = await userAccounts.getAll();

            // Assert
            expect(got.length).toBe(2);
            expect(got[0].name).toBe('root');
            expect(got[0].accessRights).toBe(AccessRights.Administrator);
            expect(got[0].ptz).toBe(true);
            expect(got[1].name).toBe('John');
            expect(got[1].accessRights).toBe(AccessRights.Operator);
            expect(got[1].ptz).toBe(false);
        });

        test('should get user with operator and PTZ access', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, ROOT_AND_JOHN_THE_OPERATOR_WITH_PTZ);

            // Act
            const got = await userAccounts.getAll();

            // Assert
            expect(got.length).toBe(2);
            expect(got[0].name).toBe('root');
            expect(got[0].accessRights).toBe(AccessRights.Administrator);
            expect(got[0].ptz).toBe(true);
            expect(got[1].name).toBe('John');
            expect(got[1].accessRights).toBe(AccessRights.Operator);
            expect(got[1].ptz).toBe(true);
        });

        test('should get user with administrator access', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, ROOT_AND_JOHN_THE_ADMINISTRATOR_WITHOUT_PTZ);

            // Act
            const got = await userAccounts.getAll();

            // Assert
            expect(got.length).toBe(2);
            expect(got[0].name).toBe('root');
            expect(got[0].accessRights).toBe(AccessRights.Administrator);
            expect(got[0].ptz).toBe(true);
            expect(got[1].name).toBe('John');
            expect(got[1].accessRights).toBe(AccessRights.Administrator);
            expect(got[1].ptz).toBe(false);
        });

        test('should get user with administrator and PTZ access', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, ROOT_AND_JOHN_THE_ADMINISTRATOR_WITH_PTZ);

            // Act
            const got = await userAccounts.getAll();

            // Assert
            expect(got.length).toBe(2);
            expect(got[0].name).toBe('root');
            expect(got[0].accessRights).toBe(AccessRights.Administrator);
            expect(got[0].ptz).toBe(true);
            expect(got[1].name).toBe('John');
            expect(got[1].accessRights).toBe(AccessRights.Administrator);
            expect(got[1].ptz).toBe(true);
        });

        test('should throw exception if device is unresponsive', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

            try {
                // Act
                await userAccounts.getAll();
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(401);

            try {
                // Act
                await userAccounts.getAll();
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });
    });

    describe('#update', () => {
        test('should update user with viewer access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, false);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .reply(200, Generate.html(`Modified account ${user.name}.`));

            // Act
            await userAccounts.update(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should update user with viewer and PTZ access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, true);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .reply(200, Generate.html(`Modified account ${user.name}.`));

            // Act
            await userAccounts.update(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should update user with operator access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Operator, false);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .reply(200, Generate.html(`Modified account ${user.name}.`));

            // Act
            await userAccounts.update(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should update user with operator and PTZ access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Operator, true);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .reply(200, Generate.html(`Modified account ${user.name}.`));

            // Act
            await userAccounts.update(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should update user with administrator access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Administrator, false);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .reply(200, Generate.html(`Modified account ${user.name}.`));

            // Act
            await userAccounts.update(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should update user with administrator and PTZ access', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Administrator, true);

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .reply(200, Generate.html(`Modified account ${user.name}.`));

            // Act
            await userAccounts.update(user);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should throw exception if user does not exist', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .reply(200, Generate.html('Error: consult the system log file.'));

            try {
                // Act
                await userAccounts.update(user);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });

        test('should throw exception if device is unresponsive', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

            try {
                // Act
                await userAccounts.update(user);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            const user = new User('Joe', 'secret', AccessRights.Viewer, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=update/)
                .reply(401);

            try {
                // Act
                await userAccounts.update(user);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });
    });

    describe('#remove', () => {
        test('should remove user', async () => {
            // Arrange
            const username = 'Joe';

            const scope = nock(connection.url)
                .get(/pwdgrp.cgi\?action=remove/)
                .reply(200, Generate.html(`Removed account ${username}.`));

            // Act
            await userAccounts.remove(username);

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should throw exception if user does not exist', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=remove/)
                .reply(200, Generate.html('Error: consult the system log file.'));

            try {
                // Act
                await userAccounts.remove('Joe');
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });

        test('should throw exception if device is unresponsive', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=remove/)
                .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

            try {
                // Act
                await userAccounts.remove('Joe');
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            nock(connection.url)
                .get(/pwdgrp.cgi\?action=remove/)
                .reply(401);

            try {
                // Act
                await userAccounts.remove('Joe');
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(Error);
            }
        });
    });
});
