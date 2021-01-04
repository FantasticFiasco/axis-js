import { format } from 'util';
import { Challenge, cnonce, generateAuthorizationHeader } from '../../src/auth/digest';

describe('#generateAuthorizationHeader should', () => {
    test('generate correct header value given bare minimum challenge', () => {
        // Arrange
        const testCases: { username: string; password: string; nonce: string; expectedFormat: string }[] = [
            {
                username: 'guest',
                password: 'guest',
                nonce: '39b906c02e023c76feb985e6ec12bb76',
                expectedFormat: 'Digest username="guest", realm="test", nonce="%s", uri="/some/path/", response="d26409f3b345be8b3f740c021a6fdd64"',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: '54c3bc1a33d9cb84e8323d2fa1e54cf9',
                expectedFormat: 'Digest username="guest", realm="test", nonce="%s", uri="/some/path/", response="d0e3dbcf6d211f7318a6a814213cf703"',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: '6aa024318133309310d5e10e1db2d725',
                expectedFormat: 'Digest username="guest", realm="test", nonce="%s", uri="/some/path/", response="8f127ca65e712a95cc0d7216158d00ea"',
            },
        ];

        for (const { username, password, nonce, expectedFormat } of testCases) {
            const challenge: Challenge = {
                type: 'Digest',
                realm: 'test',
                nonce,
            };

            // Act
            const value = generateAuthorizationHeader('https://some-url.com/some/path/', username, password, challenge);

            // Assert
            expect(value).toBe(format(expectedFormat, nonce));
        }
    });

    test('generate correct header value given algorithm=MD5 and qop="auth"', () => {
        // Arrange
        const testCases: { username: string; password: string; nonce: string; cnonce: string; expectedFormat: string }[] = [
            {
                username: 'guest',
                password: 'guest',
                nonce: '8XVCURG4BQA=6435528d523e61526313ab3e9385cbc07c0a1552',
                cnonce: 'MWE0MzZiOWZmZmNiZGJiMGIwYjQ1OTI4ZTVkYTA5NDg=',
                expectedFormat:
                    'Digest username="guest", realm="test", nonce="%s", uri="/some/path/", cnonce="%s", ' +
                    'nc=00000001, qop=auth, response="a9a08205fe5b46aa0b62771d506d1e27", algorithm=MD5',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: 'rHAuaBK4BQA=d1b9a9e3ded6d9ba6882ecd7e39c8bd9203c9b30',
                cnonce: 'NzRhMDM3YWEwNjA2ZWVmMmFhNzExMTQ3OTI4Y2QxMWI=',
                expectedFormat:
                    'Digest username="guest", realm="test", nonce="%s", uri="/some/path/", cnonce="%s", ' +
                    'nc=00000001, qop=auth, response="504021e0b12a1274731d45a8b14383d8", algorithm=MD5',
            },
            {
                username: 'guest',
                password: 'guest',
                nonce: '/USrbhK4BQA=b2bcdc7e4677c71e124bef471140f6e120fe2f0f',
                cnonce: 'NmUxZDQzNTFlMTNiMzc5NTJmMTQ5YzM0OTQ1ZTJhNWU=',
                expectedFormat:
                    'Digest username="guest", realm="test", nonce="%s", uri="/some/path/", cnonce="%s", ' +
                    'nc=00000001, qop=auth, response="5e4715e6de3f8025e73bc615ef5d4953", algorithm=MD5',
            },
        ];

        for (const { username, password, nonce, cnonce, expectedFormat } of testCases) {
            const challenge: Challenge = {
                type: 'Digest',
                realm: 'test',
                nonce,
                qop: 'auth',
                algorithm: 'MD5',
            };

            // Act
            const value = generateAuthorizationHeader('/some/path/', username, password, challenge, cnonce);

            // Assert
            expect(value).toBe(format(expectedFormat, nonce, cnonce));
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
