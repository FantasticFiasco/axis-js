import { Connection, Protocol } from './../../src';
import { RestartRequest } from './../../src/restart/RestartRequest';

describe('restart request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 5678, 'root', 'pass');

    describe('#url', () => {
        test('should return URL', () => {
            // Act
            const request = new RestartRequest(connection);

            // Assert
            expect(request.url).toBe(`${connection.url}/axis-cgi/restart.cgi`);
        });
    });
});
