import * as http from 'http';
import * as https from 'https';
import { Connection, Protocol } from '../../src';

describe('connection', () => {
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
});
