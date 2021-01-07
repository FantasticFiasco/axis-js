import { Connection, FactoryDefaultType, Protocol } from '../../src';
import { FactoryDefaultRequest } from '../../src/factory-default/FactoryDefaultRequest';

describe('factory default request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 5678, 'root', 'pass');

    describe('#url (partial)', () => {
        test('should return URL', () => {
            // Act
            const got = new FactoryDefaultRequest(connection, FactoryDefaultType.Partial);

            // Assert
            expect(got.url).toBe(`${connection.url}/axis-cgi/factorydefault.cgi`);
        });
    });

    describe('#url (hard)', () => {
        test('should return URL', () => {
            // Act
            const got = new FactoryDefaultRequest(connection, FactoryDefaultType.Hard);

            // Assert
            expect(got.url).toBe(`${connection.url}/axis-cgi/hardfactorydefault.cgi`);
        });
    });
});
