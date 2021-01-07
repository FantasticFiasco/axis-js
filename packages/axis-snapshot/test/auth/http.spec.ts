import { HTTPError } from 'got';
import * as http from 'http';
import * as https from 'https';
import { client, get } from '../../src/auth/http';

const USERNAME = 'guest';
const PASSWORD = 'guest';

const NO_AUTH_URL = 'https://www.google.com';
const BASIC_AUTH_URL = 'https://jigsaw.w3.org/HTTP/Basic/';
const DIGEST_AUTH_URL = 'https://jigsaw.w3.org/HTTP/Digest/';

describe('#get should', () => {
    test('succeed given no authentication', async () => {
        // Act
        const got = await get(NO_AUTH_URL, '', '');

        // Assert
        expect(got?.statusCode).toBe(200);
    });

    test('succeed given basic authentication', async () => {
        // Act
        const got = await get(BASIC_AUTH_URL, USERNAME, PASSWORD);

        // Assert
        expect(got?.statusCode).toBe(200);
    });

    // TODO: This test is flaky
    test.skip('succeed given digest authentication', async () => {
        // Act
        const got = await get(DIGEST_AUTH_URL, USERNAME, PASSWORD);

        // Assert
        expect(got?.statusCode).toBe(200);
    });

    test('throw error given invalid credentials', async () => {
        // Arrange
        const testCases: { url: string; username: string; password: string }[] = [
            // Basic auth
            { url: BASIC_AUTH_URL, username: USERNAME, password: 'invalid password' },
            { url: BASIC_AUTH_URL, username: 'invalid username', password: PASSWORD },
            // Digest auth
            { url: DIGEST_AUTH_URL, username: USERNAME, password: 'invalid password' },
            { url: DIGEST_AUTH_URL, username: 'invalid-username', password: PASSWORD },
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
        const got = client('GET', NO_AUTH_URL, '', '', agent);

        // Assert
        expect((got.defaults.options.agent as any).http).toBe(agent);
    });

    test('respect https agent', () => {
        // Arrange
        const agent = new https.Agent({ keepAlive: true });

        // Act
        const got = client('GET', NO_AUTH_URL, '', '', agent);

        // Assert
        expect((got.defaults.options.agent as any).https).toBe(agent);
    });
});
