import { Challenge, generateAuthorizationHeader } from '../../src/auth/basic';

describe('#generateAuthorizationHeader should', () => {
    test('generate correct header value', () => {
        // Arrange
        const testCases: { username: string; password: string; expected: string }[] = [
            { username: 'root', password: 'pass', expected: 'Basic cm9vdDpwYXNz' },
            { username: 'guest', password: 'guest', expected: 'Basic Z3Vlc3Q6Z3Vlc3Q=' },
            { username: 'Jane', password: 'Doe', expected: 'Basic SmFuZTpEb2U=' },
        ];

        const challenge: Challenge = {
            type: 'Basic',
            realm: 'test',
        };

        for (const { username, password, expected } of testCases) {
            // Act
            const headerValue = generateAuthorizationHeader(username, password, challenge);

            // Assert
            expect(headerValue).toBe(expected);
        }
    });
});
