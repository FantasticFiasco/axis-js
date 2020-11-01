import { Connection, Protocol } from '../../../src';
import { GetUsersRequest } from '../../../src/user-accounts/request-response/GetUsersRequest';

describe('get users request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    describe('#url', () => {
        test('should return URL when getting all users', () => {
            // Act
            const request = new GetUsersRequest(connection);

            // Assert
            expect(request.url).toBe(`${connection.url}/axis-cgi/pwdgrp.cgi?action=get`);
        });
    });
});
