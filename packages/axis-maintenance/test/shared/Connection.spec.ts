import * as http from 'http';
import * as https from 'https';
import { Connection, Protocol } from '../../src';

describe('connection', () => {
    describe('#url', () => {
        describe('#ctor(protocol, ...)', () => {
            test('should return connection without options', () => {
                // Act
                const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

                // Assert
                expect(connection).toBeTruthy();
            });

            test('should return connection with http agent options', () => {
                // Act
                const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass', {
                    agent: new http.Agent(),
                });

                // Assert
                expect(connection).toBeTruthy();
                expect(connection.options?.agent).toBeTruthy();
            });

            test('should return connection with https agent options', () => {
                // Act
                const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass', {
                    agent: new https.Agent(),
                });

                // Assert
                expect(connection).toBeTruthy();
                expect(connection.options?.agent).toBeTruthy();
            });
        });

        test('should return URL given HTTP protocol', () => {
            // Act
            const connection = new Connection(Protocol.Http, '1.2.3.4', 5678, 'root', 'pass');

            // Assert
            expect(connection.url).toBe('http://1.2.3.4:5678');
        });

        test('should return URL given HTTPS protocol', () => {
            // Act
            const connection = new Connection(Protocol.Https, '1.2.3.4', 5678, 'root', 'pass');

            // Assert
            expect(connection.url).toBe('https://1.2.3.4:5678');
        });
    });
});
