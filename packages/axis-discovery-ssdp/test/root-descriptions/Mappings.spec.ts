import { mapFromRootDescription } from '../../src/root-descriptions/Mappings';
import { RootDescription } from '../../src/root-descriptions/RootDescription';
import {
    ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT,
    ROOT_DESCRIPTION_DEFAULT_HTTP_PORT,
    ROOT_DESCRIPTION_NO_PORT,
    ROOT_DESCRIPTION_WITHOUT_MACADDRESS,
    ROOT_DESCRIPTION_WITH_LOWERCASE_MACADDRESS,
} from './RootDescription.mock';

describe('Mappings', () => {
    describe('#mapFromRootDescription', () => {
        test('should map root descriptions', async () => {
            // Arrange
            const rootDescription = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const got = mapFromRootDescription(rootDescription);

            // Assert
            expect(got?.address).toBe('192.168.1.102');
            expect(got?.port).toBe(80);
            expect(got?.macAddress).toBe('ACCC8E270AD8');
            expect(got?.friendlyName).toBe('AXIS M1014 - ACCC8E270AD8');
            expect(got?.modelName).toBe('AXIS M1014');
            expect(got?.modelDescription).toBe('AXIS M1014 Fixed Network Camera');
            expect(got?.modelNumber).toBe('M1014');
            expect(got?.presentationURL).toBe('http://192.168.1.102:80/');
        });

        test('should map root descriptions with default HTTP port', async () => {
            // Arrange
            const rootDescription = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Act
            const got = mapFromRootDescription(rootDescription);

            // Assert
            expect(got?.port).toBe(80);
        });

        test('should map root descriptions with default HTTPS port', async () => {
            // Arrange
            const rootDescription = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT);

            // Act
            const got = mapFromRootDescription(rootDescription);

            // Assert
            expect(got?.port).toBe(443);
        });

        test('should map root descriptions without port', async () => {
            // Arrange
            const rootDescription = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_NO_PORT);

            // Act
            const got = mapFromRootDescription(rootDescription);

            // Assert
            expect(got?.port).toBeFalsy();
        });

        test('should map root descriptions and convert MAC address to uppercase', async () => {
            // Arrange
            const rootDescription = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_WITH_LOWERCASE_MACADDRESS);

            // Act
            const got = mapFromRootDescription(rootDescription);

            // Assert
            expect(got?.macAddress).toBe('ACCC8E270AD8');
        });

        test('should not map root description without MAC address', async () => {
            // Arrange
            const rootDescription = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_WITHOUT_MACADDRESS);

            // Act
            const got = mapFromRootDescription(rootDescription);

            // Assert
            expect(got).toBeFalsy();
        });
    });
});
