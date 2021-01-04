import { Challenge, generateAuthorizationHeader } from '../../src/auth/digest';

describe('#generateAuthorizationHeader should', () => {
    test('generate correct header value given bare minimum challenge', () => {
        // Arrange
        const testCases: { username: string; password: string; expected: string }[] = [
            {
                username: 'guest',
                password: 'guest',
                expected:
                    'Digest username="guest", realm="test", nonce="39b906c02e023c76feb985e6ec12bb76", uri="/HTTP/Digest/", response="d49bb3077ed2165567fcb49bd7130542"',
            },
        ];

        const challenge: Challenge = {
            type: 'Digest',
            realm: 'test',
            nonce: '39b906c02e023c76feb985e6ec12bb76',
        };

        for (const { username, password, expected } of testCases) {
            // Act
            const headerValue = generateAuthorizationHeader('https://some-url.com/HTTP/Digest/', username, password, challenge);

            // Assert
            expect(headerValue).toBe(expected);
        }
    });
});
