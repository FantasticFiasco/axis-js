import { DeviceCache } from '../../src/caches/DeviceCache';
import { DEVICE_WITHOUT_INFORMATION, DEVICE_WITHOUT_MAC_ADDRESS, DEVICE_WITH_INFORMATION } from './DeviceCache.mock';

describe('DeviceCache', () => {
    describe('#update', () => {
        test('should return device when cache miss', () => {
            // Arrange
            const subject = new DeviceCache();

            // Act
            const got = subject.update(DEVICE_WITHOUT_INFORMATION);

            // Assert
            expect(got).toEqual(DEVICE_WITHOUT_INFORMATION);
        });

        test('should return device when cache hit holds more information', () => {
            // Arrange
            const subject = new DeviceCache(DEVICE_WITH_INFORMATION);

            // Act
            const got = subject.update(DEVICE_WITHOUT_INFORMATION);

            // Assert
            expect(got).toEqual(DEVICE_WITH_INFORMATION);
        });

        test('should return device when cache hit holds less information', () => {
            // Arrange
            const subject = new DeviceCache(DEVICE_WITHOUT_INFORMATION);

            // Act
            const got = subject.update(DEVICE_WITH_INFORMATION);

            // Assert
            expect(got).toEqual(DEVICE_WITH_INFORMATION);
        });

        test('should return device when cache hit holds identical information', () => {
            // Arrange
            const subject = new DeviceCache(DEVICE_WITHOUT_INFORMATION);

            // Act
            const got = subject.update(DEVICE_WITHOUT_INFORMATION);

            // Assert
            expect(got).toEqual(DEVICE_WITHOUT_INFORMATION);
        });

        test('should fail when device has no MAC address', () => {
            // Arrange
            const subject = new DeviceCache();

            // Act
            const fn = () => subject.update(DEVICE_WITHOUT_MAC_ADDRESS);

            // Assert
            expect(fn).toThrow();
        });
    });
});
