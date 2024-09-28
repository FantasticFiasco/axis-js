import { Connection, Protocol } from 'axis-core';
import { RemoveUserRequest } from '../../../src/user-accounts/request-response/RemoveUserRequest';

describe('remove user request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    describe('#url', () => {
        test('should return URL when removing user', () => {
            // Arrange
            const username = 'John';

            // Act
            const got = new RemoveUserRequest(connection, username);

            // Assert
            expect(got.relativePath()).toBe(`/axis-cgi/pwdgrp.cgi?action=remove&user=${username}`);
        });
    });
});
