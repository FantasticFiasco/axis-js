import { HTTPError } from 'got';
import * as http from 'http';
import * as https from 'https';
import { client, get } from '../../src/auth/http';
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
        // Act
        const got = await get(webServer.guestUri, '', '');

        // Assert
        expect(got?.statusCode).toBe(200);
        expect(got?.body.toString()).toBe('Success');
    });

    test('succeed given basic authentication', async () => {
        // Act
        const got = await get(webServer.basicAuthUri, webServer.username, webServer.password);

        // Assert
        expect(got?.statusCode).toBe(200);
        expect(got?.body.toString()).toBe('Success');
    });

    test('succeed given digest authentication', async () => {
        // Act
        const got = await get(webServer.digestAuthUri, webServer.username, webServer.password);

        // Assert
        expect(got?.statusCode).toBe(200);
        expect(got?.body.toString()).toBe('Success');
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
            // Act
            try {
                await get(url, username, password);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(HTTPError);
                expect((error as HTTPError).response.statusCode).toBe(401);
            }
        }
    });
});

describe('#client should', () => {
    test('respect http agent', () => {
        // Arrange
        const agent = new http.Agent({ keepAlive: true });

        // Act
        const got = client('GET', webServer.guestUri, '', '', agent);

        // Assert
        expect((got.defaults.options.agent as { http: http.Agent }).http).toBe(agent);
    });

    test('respect https agent', () => {
        // Arrange
        const agent = new https.Agent({ keepAlive: true });

        // Act
        const got = client('GET', webServer.guestUri, '', '', agent);

        // Assert
        expect((got.defaults.options.agent as { https: https.Agent }).https).toBe(agent);
    });
});
