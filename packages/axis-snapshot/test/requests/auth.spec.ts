import { get } from '../../src/requests/auth';

const USERNAME = 'root';
const PASSWORD = 'pass';

const NO_AUTH_URL = 'https://www.google.com';
const BASIC_AUTH_URL = `http://httpbin.org/basic-auth/${USERNAME}/${PASSWORD}`;
// const DIGEST_AUTH_URL = `http://httpbin.org/digest-auth/auth/${USERNAME}/${PASSWORD}`;

describe('#get should', () => {
    test('succeed given no authentication', async () => {
        // Act
        const res = await get(NO_AUTH_URL, '', '');

        // Assert
        expect(res?.body).toBeDefined();
    });

    test('succeed given basic authentication', async () => {
        // Act
        const res = await get(BASIC_AUTH_URL, USERNAME, PASSWORD);

        // Assert
        expect(JSON.parse(res!.body)).toStrictEqual({
            authenticated: true,
            user: USERNAME,
        });
    });
});

// describe('#basicAuth should', () => {
//     test('successfully authenticate given valid credentials', async () => {
//         // Act
//         const res = await basicAuth(BASIC_AUTH_URL, USERNAME, PASSWORD);

//         // Assert
//         expect(JSON.parse(res.body)).toStrictEqual({
//             authenticated: true,
//             user: USERNAME,
//         });
//     });

//     test('throw error given invalid credentials', async () => {
//         // Arrange
//         const testCases: { username: string; password: string }[] = [
//             { username: USERNAME, password: 'invalid password' },
//             { username: 'invalid username', password: PASSWORD },
//         ];

//         for (const { username, password } of testCases) {
//             // Act
//             try {
//                 await basicAuth(BASIC_AUTH_URL, username, password);
//                 throw new Error('This exception should not be thrown');
//             } catch (error) {
//                 // Assert
//                 expect(error).toBeInstanceOf(HTTPError);
//                 expect((error as HTTPError).response.statusCode).toBe(401);
//             }
//         }
//     });
// });

// describe('#digestAuth should', () => {
//     test('successfully authenticate given valid credentials', async () => {
//         // Act
//         const res = await digestAuth(DIGEST_AUTH_URL, USERNAME, PASSWORD);

//         // Assert
//         expect(JSON.parse(res.body)).toStrictEqual({
//             authenticated: true,
//             user: USERNAME,
//         });
//     });

//     test('throw error given invalid credentials', async () => {
//         // Arrange
//         const testCases: { username: string; password: string }[] = [
//             { username: USERNAME, password: 'invalid password' },
//             { username: 'invalid username', password: PASSWORD },
//         ];

//         for (const { username, password } of testCases) {
//             // Act
//             try {
//                 await digestAuth(DIGEST_AUTH_URL, username, password);
//                 throw new Error('This exception should not be thrown');
//             } catch (error) {
//                 // Assert
//                 expect(error).toBeInstanceOf(HTTPError);
//                 expect((error as HTTPError).response.statusCode).toBe(401);
//             }
//         }
//     });
// });
