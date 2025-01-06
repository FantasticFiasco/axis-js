import * as basic from '../../src/auth/basic';
import { parse } from '../../src/auth/challenge';
import * as digest from '../../src/auth/digest';

describe('#parse should', () => {
    test('successfully parse basic auth challenge', () => {
        // Arrange
        const wwwAuthenticate = 'Basic realm="test"';

        // Act
        const got = parse(wwwAuthenticate) as basic.Challenge;

        // Assert
        expect(got.type).toBe(basic.BASIC);
        expect(got.realm).toBe('test');
    });

    test('successfully parse bare minimum digest auth challenge', () => {
        // Arrange
        const wwwAuthenticate = 'Digest realm="test", nonce="some-nonce"';

        // Act
        const got = parse(wwwAuthenticate) as digest.Challenge;

        // Assert
        expect(got.type).toBe(digest.DIGEST);
        expect(got.realm).toBe('test');
        expect(got.nonce).toBe('some-nonce');
        expect(got.qop).toBeUndefined();
        expect(got.opaque).toBeUndefined();
        expect(got.algorithm).toBeUndefined();
    });

    test('successfully parse full digest auth challenge', () => {
        // Arrange
        const wwwAuthenticate = 'Digest realm="test", nonce="some-nonce", algorithm=MD5, qop="auth", opaque="some-opaque"';

        // Act
        const got = parse(wwwAuthenticate) as digest.Challenge;

        // Assert
        expect(got.type).toBe(digest.DIGEST);
        expect(got.realm).toBe('test');
        expect(got.nonce).toBe('some-nonce');
        expect(got.qop).toBe('auth');
        expect(got.opaque).toBe('some-opaque');
        expect(got.algorithm).toBe('MD5');
    });

    test('throw error given unsupported auth protocol', () => {
        // Act
        const fn = () => parse('Invalid realm="test"');

        // Assert
        expect(fn()).toThrow();
    });
});
