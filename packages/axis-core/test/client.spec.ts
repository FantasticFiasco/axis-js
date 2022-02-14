import { HTTPError } from 'got';
import { get } from '../src/client';
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
