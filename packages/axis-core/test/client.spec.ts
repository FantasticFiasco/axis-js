import { URL } from 'url';
import { Connection, get, Protocol } from '../src';
import { WebServer } from './web-server';

let webServer: WebServer;

beforeAll(async () => {
    webServer = new WebServer();
    await webServer.listen('127.0.0.1', 0);
});

afterAll(async () => {
    await webServer.close();
});

describe('#get should', () => {
    test('succeed given no authentication', async () => {
        // Arrange
        const { connection, relativePath } = parseUrl(webServer.guestUri, '', '');

        // Act
        const got = await get(connection, relativePath);

        // Assert
        expect(got.status).toBe(200);
        await expect(got.text()).resolves.toBe('Success');
    });

    test('succeed given basic authentication', async () => {
        // Arrange
        const { connection, relativePath } = parseUrl(webServer.guestUri, webServer.username, webServer.password);

        // Act
        const got = await get(connection, relativePath);

        // Assert
        expect(got.status).toBe(200);
        await expect(got.text()).resolves.toBe('Success');
    });

    test('succeed given digest authentication', async () => {
        // Arrange
        const { connection, relativePath } = parseUrl(webServer.digestAuthUri, webServer.username, webServer.password);

        // Act
        const got = await get(connection, relativePath);

        // Assert
        expect(got.status).toBe(200);
        await expect(got.text()).resolves.toBe('Success');
    });

    test('throw error given invalid credentials', async () => {
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

            // Act
            const res = await get(connection, relativePath);
            expect(res.status).toBe(401);
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
