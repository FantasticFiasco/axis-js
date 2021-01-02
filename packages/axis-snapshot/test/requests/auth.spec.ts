import { HTTPError } from 'got';
import { basicAuth } from '../../src/requests/auth';

const USERNAME = 'root';
const PASSWORD = 'pass';
const BASIC_AUTH_URL = `http://httpbin.org/basic-auth/${USERNAME}/${PASSWORD}`;

describe('#basicAuth should', () => {
    test('successfully authenticate given valid credentials', async () => {
        // Act
        const res = await basicAuth(BASIC_AUTH_URL, USERNAME, PASSWORD);

        // Assert
        expect(JSON.parse(res.body)).toStrictEqual({
            authenticated: true,
            user: USERNAME,
        });
    });

    test('throw error given invalid credentials', async () => {
        // Arrange
        const testCases: { username: string; password: string }[] = [
            { username: USERNAME, password: 'invalid password' },
            { username: 'invalid username', password: PASSWORD },
        ];

        for (const { username, password } of testCases) {
            // Act
            try {
                await basicAuth(BASIC_AUTH_URL, username, password);
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(HTTPError);
                expect((error as HTTPError).response.statusCode).toBe(401);
            }
        }
    });
});
