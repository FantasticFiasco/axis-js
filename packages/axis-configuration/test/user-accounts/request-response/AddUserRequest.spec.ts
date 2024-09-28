import { Connection, Protocol } from 'axis-core';
import { AccessRights, User } from '../../../src';
import { AddUserRequest } from '../../../src/user-accounts/request-response/AddUserRequest';

describe('add user request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    describe('#url', () => {
        test('should return URL when adding user with viewer access', () => {
            // Arrange
            const user = new User('John', 'password', AccessRights.Viewer, false);

            // Act
            const got = new AddUserRequest(connection, user);

            // Assert
            expect(got.relativePath).toBe(`/axis-cgi/pwdgrp.cgi?action=add&user=${user.name}&pwd=${user.password}&grp=users&sgrp=viewer&comment=${user.name}`);
        });

        test('should return URL when adding user with viewer access and PTZ control', () => {
            // Arrange
            const user = new User('John', 'password', AccessRights.Viewer, true);

            // Act
            const got = new AddUserRequest(connection, user);

            // Assert
            expect(got.relativePath).toBe(
                `/axis-cgi/pwdgrp.cgi?action=add&user=${user.name}&pwd=${user.password}&grp=users&sgrp=viewer:ptz&comment=${user.name}`,
            );
        });

        test('should return URL when adding user with operator access', () => {
            // Arrange
            const user = new User('John', 'password', AccessRights.Operator, false);

            // Act
            const got = new AddUserRequest(connection, user);

            // Assert
            expect(got.relativePath).toBe(
                `/axis-cgi/pwdgrp.cgi?action=add&user=${user.name}&pwd=${user.password}&grp=users&sgrp=operator:viewer&comment=${user.name}`,
            );
        });

        test('should return URL when adding user with operator access and PTZ control', () => {
            // Arrange
            const user = new User('John', 'password', AccessRights.Operator, true);

            // Act
            const got = new AddUserRequest(connection, user);

            // Assert
            expect(got.relativePath).toBe(
                `/axis-cgi/pwdgrp.cgi?action=add&user=${user.name}&pwd=${user.password}&grp=users&sgrp=operator:viewer:ptz&comment=${user.name}`,
            );
        });

        test('should return URL when adding user with administrator access', () => {
            // Arrange
            const user = new User('John', 'password', AccessRights.Administrator, false);

            // Act
            const got = new AddUserRequest(connection, user);

            // Assert
            expect(got.relativePath).toBe(
                `/axis-cgi/pwdgrp.cgi?action=add&user=${user.name}&pwd=${user.password}&grp=users&sgrp=admin:operator:viewer&comment=${user.name}`,
            );
        });

        test('should return URL when adding user with administrator access and PTZ control', () => {
            // Arrange
            const user = new User('John', 'password', AccessRights.Administrator, true);

            // Act
            const got = new AddUserRequest(connection, user);

            // Assert
            expect(got.relativePath).toBe(
                `/axis-cgi/pwdgrp.cgi?action=add&user=${user.name}&pwd=${user.password}&grp=users&sgrp=admin:operator:viewer:ptz&comment=${user.name}`,
            );
        });
    });
});
