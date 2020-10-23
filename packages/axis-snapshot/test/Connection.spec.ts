import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import { Connection, Protocol } from '../src';

describe('connection', () => {
    describe('#ctor(protocol, ...)', () => {
        test('should return connection without options', () => {
            // Act
            const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

            // Assert
            expect(connection.options?.agent).toBeUndefined();
        });

        test('should return connection with http agent options', () => {
            // Act
            const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass', {
                agent: new HttpAgent(),
            });

            // Assert
            expect(connection.options?.agent).toBeDefined();
        });

        test('should return connection with https agent options', () => {
            // Act
            const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass', {
                agent: new HttpsAgent(),
            });

            // Assert
            expect(connection.options?.agent).toBeDefined();
        });
    });
});
