import { Connection, Protocol } from 'axis-core';
import { AccessRights, User } from '../../src';
import { UpdateUserRequest } from '../../src/user-accounts/UpdateUser';

describe('update user request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 1234, 'root', 'pass');

    test('should return URL when updating to viewer access', () => {
        // Arrange
        const user = new User('John', 'password', AccessRights.Viewer, false);

        // Act
        const got = new UpdateUserRequest(connection, user);

        // Assert
        expect(got.url).toBe(`http://1.2.3.4:1234/axis-cgi/pwdgrp.cgi?action=update&user=${user.name}&pwd=${user.password}&grp=users&sgrp=viewer`);
    });

    test('should return URL when updating to viewer access and PTZ control', () => {
        // Arrange
        const user = new User('John', 'password', AccessRights.Viewer, true);

        // Act
        const got = new UpdateUserRequest(connection, user);

        // Assert
        expect(got.url).toBe(`http://1.2.3.4:1234/axis-cgi/pwdgrp.cgi?action=update&user=${user.name}&pwd=${user.password}&grp=users&sgrp=viewer:ptz`);
    });

    test('should return URL when updating to operator access', () => {
        // Arrange
        const user = new User('John', 'password', AccessRights.Operator, false);

        // Act
        const got = new UpdateUserRequest(connection, user);

        // Assert
        expect(got.url).toBe(`http://1.2.3.4:1234/axis-cgi/pwdgrp.cgi?action=update&user=${user.name}&pwd=${user.password}&grp=users&sgrp=operator:viewer`);
    });

    test('should return URL when updating to operator access and PTZ control', () => {
        // Arrange
        const user = new User('John', 'password', AccessRights.Operator, true);

        // Act
        const got = new UpdateUserRequest(connection, user);

        // Assert
        expect(got.url).toBe(`http://1.2.3.4:1234/axis-cgi/pwdgrp.cgi?action=update&user=${user.name}&pwd=${user.password}&grp=users&sgrp=operator:viewer:ptz`);
    });

    test('should return URL when updating to administrator access', () => {
        // Arrange
        const user = new User('John', 'password', AccessRights.Administrator, false);

        // Act
        const got = new UpdateUserRequest(connection, user);

        // Assert
        expect(got.url).toBe(
            `http://1.2.3.4:1234/axis-cgi/pwdgrp.cgi?action=update&user=${user.name}&pwd=${user.password}&grp=users&sgrp=admin:operator:viewer`,
        );
    });

    test('should return URL when updating to administrator access and PTZ control', () => {
        // Arrange
        const user = new User('John', 'password', AccessRights.Administrator, true);

        // Act
        const got = new UpdateUserRequest(connection, user);

        // Assert
        expect(got.url).toBe(
            `http://1.2.3.4:1234/axis-cgi/pwdgrp.cgi?action=update&user=${user.name}&pwd=${user.password}&grp=users&sgrp=admin:operator:viewer:ptz`,
        );
    });
});
