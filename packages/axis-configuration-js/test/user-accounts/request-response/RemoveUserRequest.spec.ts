import { Connection, Protocol } from './../../../src';
import { RemoveUserRequest } from './../../../src/user-accounts/request-response/RemoveUserRequest';

describe('remove user request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    describe('#url', () => {
        test('should return URL when removing user', () => {
            // Arrange
            const username = 'John';

            // Act
            const request = new RemoveUserRequest(connection, username);

            // Assert
            expect(request.url).toBe(`${connection.url}/axis-cgi/pwdgrp.cgi?action=remove&user=${username}`);
        });
    });
});
