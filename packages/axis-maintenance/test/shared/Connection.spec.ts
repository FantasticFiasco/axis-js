import * as http from 'http';
import * as https from 'https';
import { Connection, Protocol } from '../../src';

describe('connection', () => {
    describe('#url', () => {
        describe('#ctor(protocol, ...)', () => {
            test('should return connection without options', () => {
                // Act
                const got = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

                // Assert
                expect(got).toBeTruthy();
            });

            test('should return connection with http agent options', () => {
                // Act
                const got = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass', {
                    agent: new http.Agent(),
                });

                // Assert
                expect(got).toBeTruthy();
                expect(got.options?.agent).toBeTruthy();
            });

            test('should return connection with https agent options', () => {
                // Act
                const got = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass', {
                    agent: new https.Agent(),
                });

                // Assert
                expect(got).toBeTruthy();
                expect(got.options?.agent).toBeTruthy();
            });
        });

        test('should return URL given HTTP protocol', () => {
            // Act
            const got = new Connection(Protocol.Http, '1.2.3.4', 5678, 'root', 'pass');

            // Assert
            expect(got.url).toBe('http://1.2.3.4:5678');
        });

        test('should return URL given HTTPS protocol', () => {
            // Act
            const got = new Connection(Protocol.Https, '1.2.3.4', 5678, 'root', 'pass');

            // Assert
            expect(got.url).toBe('https://1.2.3.4:5678');
        });
    });
});
