import { HTTPError } from 'got';
import { get } from '../../src/auth/auth';

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
        expect(got!.body).toBeDefined();
    });

    test('succeed given basic authentication', async () => {
        // Act
        const got = await get(BASIC_AUTH_URL, USERNAME, PASSWORD);

        // Assert
        expect(got!.body).toBeDefined();
    });

    test('succeed given digest authentication', async () => {
        // Act
        const got = await get(DIGEST_AUTH_URL, USERNAME, PASSWORD);

        // Assert
        expect(got!.body).toBeDefined();
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
