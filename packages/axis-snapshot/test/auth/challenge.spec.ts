import { Challenge as BasicChallenge } from '../../src/auth/basic';
import { parse } from '../../src/auth/challenge';
import { Challenge as DigestChallenge } from '../../src/auth/digest';

describe('#parse should', () => {
    test('successfully parse basic auth challenge', () => {
        // Arrange
        const wwwAuthenticate = 'Basic realm="test"';

        // Act
        const challenge = parse(wwwAuthenticate) as BasicChallenge;

        // Assert
        expect(challenge.type).toBe('Basic');
        expect(challenge.realm).toBe('test');
    });

    test('successfully parse bare minimum digest auth challenge', () => {
        // Arrange
        const wwwAuthenticate = 'Digest realm="test", nonce="some-nonce"';

        // Act
        const challenge = parse(wwwAuthenticate) as DigestChallenge;

        // Assert
        expect(challenge.type).toBe('Digest');
        expect(challenge.realm).toBe('test');
        expect(challenge.nonce).toBe('some-nonce');
        expect(challenge.qop).toBeUndefined();
        expect(challenge.opaque).toBeUndefined();
        expect(challenge.algorithm).toBeUndefined();
    });

    test('successfully parse full digest auth challenge', () => {
        // Arrange
        const wwwAuthenticate = 'Digest realm="test", nonce="some-nonce", algorithm=MD5, qop="auth", opaque="some-opaque"';

        // Act
        const challenge = parse(wwwAuthenticate) as DigestChallenge;

        // Assert
        expect(challenge.type).toBe('Digest');
        expect(challenge.realm).toBe('test');
        expect(challenge.nonce).toBe('some-nonce');
        expect(challenge.qop).toBe('auth');
        expect(challenge.opaque).toBe('some-opaque');
        expect(challenge.algorithm).toBe('MD5');
    });

    test('throw error given unsupported auth protocol', () => {
        // Act
        const fn = () => parse('Invalid realm="test"');

        // Assert
        expect(fn).toThrow();
    });
});
