import { URL } from 'url';
import { Connection } from '../src/Connection';
import { DeviceRequest } from '../src/DeviceRequest';
import { Protocol } from '../src/Protocol';
import { WebServer } from './web-server';

let webServer: WebServer;

class TestRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection, fetch);
    }

    public async send(relativePath: string): Promise<Response> {
        return this._get(relativePath);
    }
}

beforeAll(async () => {
    webServer = new WebServer();
    await webServer.listen('127.0.0.1', 0);
});

afterAll(async () => {
    await webServer.close();
});

describe('should', () => {
    test('succeed given no authentication', async () => {
        // Arrange
        const { connection, relativePath } = parseUrl(webServer.guestUri, '', '');
        const req = new TestRequest(connection);

        // Act
        const got = await req.send(relativePath);

        // Assert
        expect(got.status).toBe(200);
        await expect(got.text()).resolves.toBe('Success');
    });

    test('succeed given basic authentication', async () => {
        // Arrange
        const { connection, relativePath } = parseUrl(webServer.guestUri, webServer.username, webServer.password);
        const req = new TestRequest(connection);

        // Act
        const got = await req.send(relativePath);

        // Assert
        expect(got.status).toBe(200);
        await expect(got.text()).resolves.toBe('Success');
    });

    test('succeed given digest authentication', async () => {
        // Arrange
        const { connection, relativePath } = parseUrl(webServer.digestAuthUri, webServer.username, webServer.password);
        const req = new TestRequest(connection);

        // Act
        const got = await req.send(relativePath);

        // Assert
        expect(got.status).toBe(200);
        await expect(got.text()).resolves.toBe('Success');
    });

    test('return status 401 given invalid credentials', async () => {
        // Arrange
        const testCases: { url: string; username: string; password: string }[] = [
            // Basic auth
            { url: webServer.basicAuthUri, username: webServer.username, password: 'invalid password' },
            { url: webServer.basicAuthUri, username: 'invalid username', password: webServer.password },
            // Digest auth
            { url: webServer.digestAuthUri, username: webServer.username, password: 'invalid password' },
            { url: webServer.digestAuthUri, username: 'invalid-username', password: webServer.password },
        ];

        for (const { url, username, password } of testCases) {
            const { connection, relativePath } = parseUrl(url, username, password);
            const req = new TestRequest(connection);

            // Act
            const got = await req.send(relativePath);
            expect(got.status).toBe(401);
        }
    });
});

const parseUrl = (url: string, username: string, password: string): { connection: Connection; relativePath: string } => {
    const { protocol, hostname, port, pathname } = new URL(url);

    if (protocol !== 'http:') {
        throw new Error('Tests are currently not written to support HTTPS');
    }

    const connection = new Connection(Protocol.Http, hostname, Number(port), username, password);
    const relativePath = pathname;

    return {
        connection,
        relativePath,
    };
};
