import { Connection } from '../src/Connection';
import { Protocol } from '../src/Protocol';

describe('connection', () => {
    describe('#url', () => {
        test('should return http url', () => {
            // Act
            const got = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

            // Assert
            expect(got).toBeTruthy();
            expect(got.url).toBe('http://1.2.3.4:80');
        });

        test('should return https url', () => {
            // Act
            const got = new Connection(Protocol.Https, '1.2.3.4', 80, 'root', 'pass');

            // Assert
            expect(got).toBeTruthy();
            expect(got.url).toBe('https://1.2.3.4:80');
        });
    });
});
