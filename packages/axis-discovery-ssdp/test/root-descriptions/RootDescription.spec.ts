import { RootDescription } from './../../src/root-descriptions/RootDescription';
import { ROOT_DESCRIPTION_DEFAULT_HTTP_PORT, ROOT_DESCRIPTION_REQUIRED_PROPERTIES } from './RootDescription.mock';

describe('RootDescription', () => {
    describe('#remoteAddress', () => {
        test('should return remote address', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            expect(subject.remoteAddress).toBe('192.168.1.102');
        });
    });

    describe('#friendlyName', () => {
        test('should return friendly name', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            expect(subject.friendlyName).toBe('AXIS M1014 - ACCC8E270AD8');
        });
    });

    describe('#modelDescription', () => {
        test('should return model description', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            expect(subject.modelDescription!).toBe('AXIS M1014 Fixed Network Camera');
        });

        test('should not return model description if missing', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Assert
            expect(subject.modelDescription).toBeFalsy();
        });
    });

    describe('#modelName', () => {
        test('should return model name', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            expect(subject.modelName).toBe('AXIS M1014');
        });
    });

    describe('#modelNumber', () => {
        test('should return model number', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            expect(subject.modelNumber!).toBe('M1014');
        });

        test('should not return model number if missing', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Assert
            expect(subject.modelNumber).toBeFalsy();
        });
    });

    describe('#macAddress', () => {
        test('should return MAC address', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            expect(subject.macAddress!).toBe('ACCC8E270AD8');
        });

        test('should not return MAC address if missing', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Assert
            expect(subject.macAddress).toBeFalsy();
        });
    });

    describe('#presentationUrl', () => {
        test('should return presentation URL', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

            // Assert
            expect(subject.presentationUrl!).toBe('http://192.168.1.102:80/');
        });

        test('should not return presentation URL if missing', async () => {
            // Act
            const subject = await RootDescription.parse('192.168.1.102', ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

            // Assert
            expect(subject.presentationUrl).toBeFalsy();
        });
    });
});
