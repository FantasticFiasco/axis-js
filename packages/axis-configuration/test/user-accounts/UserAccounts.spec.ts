import { ExpectationError } from '@fantasticfiasco/expect';
import * as nock from 'nock';
import { AccessRights, Connection, Protocol, RequestError, UnauthorizationError, UnknownError, User, UserAccounts, UserAlreadyExistsError } from '../../src';
import { Generate } from './Generate';
import { GetUsersResponseBuilder } from './request-response/GetUsersResponseBuilder';

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
                expect(error).toBeInstanceOf(RequestError);
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
                expect(error).toBeInstanceOf(UnauthorizationError);
            }
        });
    });

    describe('#getAll', () => {
        let responseBuilder: GetUsersResponseBuilder;

        beforeEach(() => {
            responseBuilder = new GetUsersResponseBuilder();
        });

        test('should get user with viewer access', async () => {
            // Arrange
            responseBuilder.addUser('Joe', AccessRights.Viewer, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, responseBuilder.build());

            // Act
            const users = await userAccounts.getAll();

            // Assert
            expect(users.length).toBe(1);
            expect(users[0].name).toBe('Joe');
            expect(users[0].accessRights).toBe(AccessRights.Viewer);
            expect(users[0].ptz).toBe(false);
        });

        test('should get user with viewer and PTZ access', async () => {
            // Arrange
            responseBuilder.addUser('Joe', AccessRights.Viewer, true);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, responseBuilder.build());

            // Act
            const users = await userAccounts.getAll();

            // Assert
            expect(users.length).toBe(1);
            expect(users[0].name).toBe('Joe');
            expect(users[0].accessRights).toBe(AccessRights.Viewer);
            expect(users[0].ptz).toBe(true);
        });

        test('should get user with operator access', async () => {
            // Arrange
            responseBuilder.addUser('Joe', AccessRights.Operator, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, responseBuilder.build());

            // Act
            const users = await userAccounts.getAll();

            // Assert
            expect(users.length).toBe(1);
            expect(users[0].name).toBe('Joe');
            expect(users[0].accessRights).toBe(AccessRights.Operator);
            expect(users[0].ptz).toBe(false);
        });

        test('should get user with operator and PTZ access', async () => {
            // Arrange
            responseBuilder.addUser('Joe', AccessRights.Operator, true);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, responseBuilder.build());

            // Act
            const users = await userAccounts.getAll();

            // Assert
            expect(users.length).toBe(1);
            expect(users[0].name).toBe('Joe');
            expect(users[0].accessRights).toBe(AccessRights.Operator);
            expect(users[0].ptz).toBe(true);
        });

        test('should get user with administrator access', async () => {
            // Arrange
            responseBuilder.addUser('Joe', AccessRights.Administrator, false);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, responseBuilder.build());

            // Act
            const users = await userAccounts.getAll();

            // Assert
            expect(users.length).toBe(1);
            expect(users[0].name).toBe('Joe');
            expect(users[0].accessRights).toBe(AccessRights.Administrator);
            expect(users[0].ptz).toBe(false);
        });

        test('should get user with administrator and PTZ access', async () => {
            // Arrange
            responseBuilder.addUser('Joe', AccessRights.Administrator, true);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, responseBuilder.build());

            // Act
            const users = await userAccounts.getAll();

            // Assert
            expect(users.length).toBe(1);
            expect(users[0].name).toBe('Joe');
            expect(users[0].accessRights).toBe(AccessRights.Administrator);
            expect(users[0].ptz).toBe(true);
        });

        test('should get users', async () => {
            // Arrange
            responseBuilder.addUser('Jane', AccessRights.Administrator, true);
            responseBuilder.addUser('Franck', AccessRights.Operator, false);
            responseBuilder.addUser('Joe', AccessRights.Viewer, true);

            nock(connection.url)
                .get(/pwdgrp.cgi\?action=get/)
                .reply(200, responseBuilder.build());

            // Act
            const users = await userAccounts.getAll();

            // Assert
            expect(users.length).toBe(3);

            expect(users[0].name).toBe('Jane');
            expect(users[0].accessRights).toBe(AccessRights.Administrator);
            expect(users[0].ptz).toBe(true);

            expect(users[1].name).toBe('Franck');
            expect(users[1].accessRights).toBe(AccessRights.Operator);
            expect(users[1].ptz).toBe(false);

            expect(users[2].name).toBe('Joe');
            expect(users[2].accessRights).toBe(AccessRights.Viewer);
            expect(users[2].ptz).toBe(true);
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
                expect(error).toBeInstanceOf(RequestError);
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
                expect(error).toBeInstanceOf(UnauthorizationError);
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
                expect(error).toBeInstanceOf(UnknownError);
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
                expect(error).toBeInstanceOf(RequestError);
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
                expect(error).toBeInstanceOf(UnauthorizationError);
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
                expect(error).toBeInstanceOf(UnknownError);
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
                expect(error).toBeInstanceOf(RequestError);
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
                expect(error).toBeInstanceOf(UnauthorizationError);
            }
        });
    });
});
