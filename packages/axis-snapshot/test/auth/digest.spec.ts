import { Challenge, cnonce, generateAuthorizationHeader } from '../../src/auth/digest';

describe('#generateAuthorizationHeader should', () => {
    test('generate correct header value given bare minimum challenge', () => {
        // Arrange
        const testCases: { username: string; password: string; nonce: string; expected: string }[] = [
            {
                username: 'guest',
                password: 'guest',
                nonce: '39b906c02e023c76feb985e6ec12bb76',
                expected:
                    'Digest username="guest", realm="test", nonce="39b906c02e023c76feb985e6ec12bb76", ' +
                    'uri="/HTTP/Digest/", response="d49bb3077ed2165567fcb49bd7130542"',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: '54c3bc1a33d9cb84e8323d2fa1e54cf9',
                expected:
                    'Digest username="guest", realm="test", nonce="54c3bc1a33d9cb84e8323d2fa1e54cf9", ' +
                    'uri="/HTTP/Digest/", response="a83db573e75d000651b9343ee26dff94"',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: '6aa024318133309310d5e10e1db2d725',
                expected:
                    'Digest username="guest", realm="test", nonce="6aa024318133309310d5e10e1db2d725", ' +
                    'uri="/HTTP/Digest/", response="73643261f2acbeae08365e23bbc85c8a"',
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

    test('generate correct header value given algorithm=MD5 qop="auth"', () => {
        // Arrange
        const testCases: { username: string; password: string; nonce: string; cnonce: string; expected: string }[] = [
            {
                username: 'guest',
                password: 'guest',
                nonce: '8XVCURG4BQA=6435528d523e61526313ab3e9385cbc07c0a1552',
                cnonce: 'MWE0MzZiOWZmZmNiZGJiMGIwYjQ1OTI4ZTVkYTA5NDg=',
                expected:
                    'Digest username="guest", realm="AXIS_ACCC8EF987AE", ' +
                    'nonce="8XVCURG4BQA=6435528d523e61526313ab3e9385cbc07c0a1552", ' +
                    'uri="/axis-cgi/jpg/image.cgi", cnonce="MWE0MzZiOWZmZmNiZGJiMGIwYjQ1OTI4ZTVkYTA5NDg=", ' +
                    'nc=00000001, qop=auth, response="e3a01dbc6e1d7b1ca85634ed1492cf76", algorithm=MD5',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: 'rHAuaBK4BQA=d1b9a9e3ded6d9ba6882ecd7e39c8bd9203c9b30',
                cnonce: 'NzRhMDM3YWEwNjA2ZWVmMmFhNzExMTQ3OTI4Y2QxMWI=',
                expected:
                    'Digest username="guest", realm="AXIS_ACCC8EF987AE", ' +
                    'nonce="rHAuaBK4BQA=d1b9a9e3ded6d9ba6882ecd7e39c8bd9203c9b30", ' +
                    'uri="/axis-cgi/jpg/image.cgi", cnonce="NzRhMDM3YWEwNjA2ZWVmMmFhNzExMTQ3OTI4Y2QxMWI=", ' +
                    'nc=00000001, qop=auth, response="12181777353f1fa6264aed445a363045", algorithm=MD5',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: '/USrbhK4BQA=b2bcdc7e4677c71e124bef471140f6e120fe2f0f',
                cnonce: 'NmUxZDQzNTFlMTNiMzc5NTJmMTQ5YzM0OTQ1ZTJhNWU=',
                expected:
                    'Digest username="guest", realm="AXIS_ACCC8EF987AE", ' +
                    'nonce="/USrbhK4BQA=b2bcdc7e4677c71e124bef471140f6e120fe2f0f", ' +
                    'uri="/axis-cgi/jpg/image.cgi", cnonce="NmUxZDQzNTFlMTNiMzc5NTJmMTQ5YzM0OTQ1ZTJhNWU=", ' +
                    'nc=00000001, qop=auth, response="3c86a08a7f8289bb9738b119d144b538", algorithm=MD5',
            },
        ];

        for (const { username, password, nonce, cnonce, expected } of testCases) {
            const challenge: Challenge = {
                type: 'Digest',
                realm: 'AXIS_ACCC8EF987AE',
                nonce,
                qop: 'auth',
                algorithm: 'MD5',
            };

            // Act
            const headerValue = generateAuthorizationHeader('/axis-cgi/jpg/image.cgi', username, password, challenge, cnonce);

            // Assert
            expect(headerValue).toBe(expected);
        }
    });
});

describe('#cnonce should', () => {
    test('only contain hex characters', () => {
        // Act
        const clientNonce = cnonce();

        // Assert
        expect(clientNonce).toMatch(/^(0|1|2|3|4|5|6|7|8|9|a|b|c|d|e|f)+$/);
    });

    test('be of length 32', () => {
        // Act
        const clientNonce = cnonce();

        // Assert
        expect(clientNonce.length).toBe(32);
    });
});
