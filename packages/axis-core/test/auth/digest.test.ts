import { format } from 'util';
import { Challenge, createCnonce, createHeader, DIGEST } from '../../src/auth/digest';

describe('#createHeader should', () => {
    test('generate correct value given bare minimum challenge', () => {
        // Arrange
        const testCases: { username: string; password: string; nonce: string; wantFormat: string }[] = [
            {
                username: 'root',
                password: 'pass',
                nonce: '39b906c02e023c76feb985e6ec12bb76',
                wantFormat: 'Digest username="root", realm="test", nonce="%s", uri="/some/path/", response="a6898ea71d67e0d764174a1f333c0e19"',
            },
            {
                username: 'root',
                password: 'pass',
                nonce: '54c3bc1a33d9cb84e8323d2fa1e54cf9',
                wantFormat: 'Digest username="root", realm="test", nonce="%s", uri="/some/path/", response="f5a67de97c76c277fc4981aa0ca8ce2c"',
            },
            {
                username: 'root',
                password: 'pass',
                nonce: '6aa024318133309310d5e10e1db2d725',
                wantFormat: 'Digest username="root", realm="test", nonce="%s", uri="/some/path/", response="67bfdb07461d580e3b28c4e5d1ff10dd"',
            },
        ];

        for (const { username, password, nonce, wantFormat } of testCases) {
            const challenge: Challenge = {
                type: DIGEST,
                realm: 'test',
                nonce,
            };

            // Act
            const got = createHeader('GET', 'https://some-url.com/some/path/', username, password, challenge);

            // Assert
            expect(got).toBe(format(wantFormat, nonce));
        }
    });

    test('generate correct value given algorithm=MD5 and qop="auth"', () => {
        // Arrange
        const testCases: { username: string; password: string; nonce: string; cnonce: string; wantFormat: string }[] = [
            {
                username: 'root',
                password: 'pass',
                nonce: '8XVCURG4BQA=6435528d523e61526313ab3e9385cbc07c0a1552',
                cnonce: 'MWE0MzZiOWZmZmNiZGJiMGIwYjQ1OTI4ZTVkYTA5NDg=',
                wantFormat:
                    'Digest username="root", realm="test", nonce="%s", uri="/some/path/", cnonce="%s", ' +
                    'nc=00000001, qop=auth, response="0a57a9b78ce8d12c50d62b6c1159081f", algorithm=MD5',
            },
            {
                username: 'root',
                password: 'pass',
                nonce: 'rHAuaBK4BQA=d1b9a9e3ded6d9ba6882ecd7e39c8bd9203c9b30',
                cnonce: 'NzRhMDM3YWEwNjA2ZWVmMmFhNzExMTQ3OTI4Y2QxMWI=',
                wantFormat:
                    'Digest username="root", realm="test", nonce="%s", uri="/some/path/", cnonce="%s", ' +
                    'nc=00000001, qop=auth, response="9e296a7a118dbf518513740e84771aec", algorithm=MD5',
            },
            {
                username: 'root',
                password: 'pass',
                nonce: '/USrbhK4BQA=b2bcdc7e4677c71e124bef471140f6e120fe2f0f',
                cnonce: 'NmUxZDQzNTFlMTNiMzc5NTJmMTQ5YzM0OTQ1ZTJhNWU=',
                wantFormat:
                    'Digest username="root", realm="test", nonce="%s", uri="/some/path/", cnonce="%s", ' +
                    'nc=00000001, qop=auth, response="6538081edea0369a86766a54177f1a4d", algorithm=MD5',
            },
        ];

        for (const { username, password, nonce, cnonce, wantFormat } of testCases) {
            const challenge: Challenge = {
                type: DIGEST,
                realm: 'test',
                nonce,
                qop: 'auth',
                algorithm: 'MD5',
            };

            // Act
            const value = createHeader('GET', '/some/path/', username, password, challenge, cnonce);

            // Assert
            expect(value).toBe(format(wantFormat, nonce, cnonce));
        }
    });

    test('throw error given qop="auth" without cnonce', () => {
        const challenge: Challenge = {
            type: DIGEST,
            realm: 'test',
            nonce: 'some-nonce',
            qop: 'auth',
            algorithm: 'MD5',
        };

        // Act
        const fn = () => createHeader('GET', '/some/path/', 'root', 'pass', challenge, undefined);

        // Assert
        expect(fn).toThrow();
    });
});

describe('#createCnonce should', () => {
    test('only contain hex characters', () => {
        // Act
        const got = createCnonce();

        // Assert
        expect(got).toMatch(/^(0|1|2|3|4|5|6|7|8|9|a|b|c|d|e|f)+$/);
    });

    test('be of length 32', () => {
        // Act
        const got = createCnonce();

        // Assert
        expect(got.length).toBe(32);
    });
});
