import { Connection, Protocol } from 'axis-core';
import { RemoveUserRequest } from '../../../src/user-accounts/RemoveUser';

describe('remove user request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    test('should return URL when removing user', () => {
        // Arrange
        const username = 'John';

        // Act
        const got = new RemoveUserRequest(connection, username);

        // Assert
        expect(got.url).toBe(`http://1.2.3.4/axis-cgi/pwdgrp.cgi?action=remove&user=${username}`);
    });
});
