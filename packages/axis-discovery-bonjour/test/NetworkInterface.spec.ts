import * as os from 'os';
import { mocked } from 'ts-jest/utils';
import { getIPv4Addresses } from './../src/NetworkInterface';
import * as mocks from './NetworkInterface.mock';

jest.mock('os');

describe('NetworkInterface', () => {
    const osMock = mocked(os);

    describe('#getIPv4Addresses', () => {
        test('should return addresses from one network interface', () => {
            // Arrange
            osMock.networkInterfaces.mockReturnValue(mocks.NETWORK_INTERFACE_WITH_TWO_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(addresses).toEqual(['1.1.1.1', '2.2.2.2']);
        });

        test('should return addresses from multiple network interfaces', () => {
            // Arrange
            osMock.networkInterfaces.mockReturnValue(mocks.NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(addresses).toEqual(['1.1.1.1', '2.2.2.2']);
        });

        test('should not return internal addresses', () => {
            // Arrange
            osMock.networkInterfaces.mockReturnValue(mocks.NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });

        test('should not return IPv6 addresses', () => {
            // Arrange
            osMock.networkInterfaces.mockReturnValue(mocks.NETWORK_INTERFACES_WITH_IPV6_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });

        test('should not fail on systems without network interfaces', () => {
            // Arrange
            osMock.networkInterfaces.mockReturnValue(mocks.NO_NETWORK_INTERFACES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });
    });
});
