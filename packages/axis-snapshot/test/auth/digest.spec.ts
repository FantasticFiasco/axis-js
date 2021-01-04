import { Challenge, generateAuthorizationHeader } from '../../src/auth/digest';

describe('#generateAuthorizationHeader should', () => {
    test('generate correct header value given bare minimum challenge', () => {
        // Arrange
        const testCases: { username: string; password: string; nonce: string; expected: string }[] = [
            {
                username: 'guest',
                password: 'guest',
                nonce: '39b906c02e023c76feb985e6ec12bb76',
                expected:
                    'Digest username="guest", realm="test", nonce="39b906c02e023c76feb985e6ec12bb76", uri="/HTTP/Digest/", response="d49bb3077ed2165567fcb49bd7130542"',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: '54c3bc1a33d9cb84e8323d2fa1e54cf9',
                expected:
                    'Digest username="guest", realm="test", nonce="54c3bc1a33d9cb84e8323d2fa1e54cf9", uri="/HTTP/Digest/", response="a83db573e75d000651b9343ee26dff94"',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: '6aa024318133309310d5e10e1db2d725',
                expected:
                    'Digest username="guest", realm="test", nonce="6aa024318133309310d5e10e1db2d725", uri="/HTTP/Digest/", response="73643261f2acbeae08365e23bbc85c8a"',
            },
        ];

        for (const { username, password, nonce, expected } of testCases) {
            const challenge: Challenge = {
                type: 'Digest',
                realm: 'test',
                nonce,
            };

            // Act
            const headerValue = generateAuthorizationHeader('https://some-url.com/HTTP/Digest/', username, password, challenge);

            // Assert
            expect(headerValue).toBe(expected);
        }
    });
});
