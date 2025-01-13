import { Connection, Protocol } from 'axis-core';
import { AccessRights, User } from '../../../src';
import { GetUsersRequest, handleGetUsers } from '../../../src/user-accounts/GetUsers';
import {
    ROOT,
    ROOT_AND_ADMIN_WITHOUT_PTZ,
    ROOT_AND_ADMIN_WITH_PTZ,
    ROOT_AND_OPERATOR_WITHOUT_PTZ,
    ROOT_AND_OPERATOR_WITH_PTZ,
    ROOT_AND_VIEWER_WITHOUT_PTZ,
    ROOT_AND_VIEWER_WITH_PTZ,
} from './GetUsers.mock';

describe('get users request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    test('should return URL when getting all users', () => {
        // Act
        const got = new GetUsersRequest(connection);

        // Assert
        expect(got.url).toBe('http://1.2.3.4/axis-cgi/pwdgrp.cgi?action=get');
    });
});

describe('get users response', () => {
    test('return only root', async () => {
        // Arrange
        const res = new Response(ROOT);

        // Act
        const got = await handleGetUsers(res);

        // Assert
        const want = [new User('root', undefined, AccessRights.Administrator, true)];
        expect(got).toStrictEqual(want);
    });

    test('return root and admin with ptz', async () => {
        // Arrange
        const res = new Response(ROOT_AND_ADMIN_WITH_PTZ);

        // Act
        const got = await handleGetUsers(res);

        // Assert
        const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Administrator, true)];
        expect(got).toStrictEqual(want);
    });

    test('return root and admin without ptz', async () => {
        // Arrange
        const res = new Response(ROOT_AND_ADMIN_WITHOUT_PTZ);

        // Act
        const got = await handleGetUsers(res);

        // Assert
        const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Administrator, false)];
        expect(got).toStrictEqual(want);
    });

    test('return root and operator with ptz', async () => {
        // Arrange
        const res = new Response(ROOT_AND_OPERATOR_WITH_PTZ);

        // Act
        const got = await handleGetUsers(res);

        // Assert
        const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Operator, true)];
        expect(got).toStrictEqual(want);
    });

    test('return root and operator without ptz', async () => {
        // Arrange
        const res = new Response(ROOT_AND_OPERATOR_WITHOUT_PTZ);

        // Act
        const got = await handleGetUsers(res);

        // Assert
        const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Operator, false)];
        expect(got).toStrictEqual(want);
    });

    test('return root and viewer with ptz', async () => {
        // Arrange
        const res = new Response(ROOT_AND_VIEWER_WITH_PTZ);

        // Act
        const got = await handleGetUsers(res);

        // Assert
        const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Viewer, true)];
        expect(got).toStrictEqual(want);
    });

    test('return root and viewer without ptz', async () => {
        // Arrange
        const res = new Response(ROOT_AND_VIEWER_WITHOUT_PTZ);

        // Act
        const got = await handleGetUsers(res);

        // Assert
        const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Viewer, false)];
        expect(got).toStrictEqual(want);
    });
});
