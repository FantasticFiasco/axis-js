import { Connection } from '../src/Connection';
import { Protocol } from '../src/Protocol';

describe('connection', () => {
    describe('#ctor(protocol, ...)', () => {
        test('should return connection', () => {
            // Act
            const got = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

            // Assert
            expect(got).toBeTruthy();
        });

        test('should return connection with http url', () => {
            // Act
            const got = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

            // Assert
            expect(got).toBeTruthy();
            expect(got.url).toBe('http://1.2.3.4:80');
        });

        test('should return connection with https url', () => {
            // Act
            const got = new Connection(Protocol.Https, '1.2.3.4', 80, 'root', 'pass');

            // Assert
            expect(got).toBeTruthy();
            expect(got.url).toBe('https://1.2.3.4:80');
        });
    });
});
