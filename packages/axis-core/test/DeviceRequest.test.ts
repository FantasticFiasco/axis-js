import { Connection, Protocol } from '../src';
import { DeviceRequest } from '../src/DeviceRequest';

class TestDeviceRequest extends DeviceRequest {
    constructor(connection: Connection, relativePath: string) {
        super(connection, relativePath);
    }
}

describe('should', () => {
    test('return http url', () => {
        // Arrange
        const connection = new Connection(Protocol.Http, '1.2.3.4', 1234, 'root', 'pass');

        // Act
        const got = new TestDeviceRequest(connection, '/test');

        // Assert
        expect(got.url).toBe('http://1.2.3.4:1234/test');
    });

    test('return https url', () => {
        // Arrange
        const connection = new Connection(Protocol.Https, '1.2.3.4', 1234, 'root', 'pass');

        // Act
        const got = new TestDeviceRequest(connection, '/test');

        // Assert
        expect(got.url).toBe('https://1.2.3.4:1234/test');
    });

    test('return username', () => {
        // Arrange
        const connection = new Connection(Protocol.Https, '1.2.3.4', 1234, 'root', 'pass');

        // Act
        const got = new TestDeviceRequest(connection, '/test');

        // Assert
        expect(got.username).toBe('root');
    });

    test('return password', () => {
        // Arrange
        const connection = new Connection(Protocol.Https, '1.2.3.4', 1234, 'root', 'pass');

        // Act
        const got = new TestDeviceRequest(connection, '/test');

        // Assert
        expect(got.password).toBe('pass');
    });
});
