import { mapFromService } from './../src/Mappings';
import { AxisService } from './Mappings.mock';

describe('Mappings', () => {
    describe('#fromService', () => {
        test('should map service to device', () => {
            // Arrange
            const service = new AxisService(['192.168.1.102', '169.254.129.36'], 'Lobby', 80, 'ACCC8E270AD8');

            // Act
            const actual = mapFromService(service);

            // Assert
            expect(actual).toBeDefined();
            expect(actual!.address).toBe('192.168.1.102');
            expect(actual!.linkLocalAddress).toBe('169.254.129.36');
            expect(actual!.port).toBe(80);
            expect(actual!.macAddress).toBe('ACCC8E270AD8');
            expect(actual!.friendlyName).toBe('Lobby');
        });

        test('should not map service without addressses', () => {
            // Arrange
            const service = new AxisService([], 'Lobby', 80, 'ACCC8E270AD8');

            // Act
            const actual = mapFromService(service);

            // Assert
            expect(actual).toBeFalsy();
        });

        test('should not map service without address', () => {
            // Arrange
            const service = new AxisService(
                ['169.254.129.36'], // Only link local address
                'Lobby',
                80,
                'ACCC8E270AD8'
            );

            // Act
            const actual = mapFromService(service);

            // Assert
            expect(actual).toBeFalsy();
        });

        test('should not map service without link local address', () => {
            // Arrange
            const service = new AxisService(
                ['192.168.1.102'], // Only address
                'Lobby',
                80,
                'ACCC8E270AD8'
            );

            // Act
            const actual = mapFromService(service);

            // Assert
            expect(actual).toBeFalsy();
        });

        test('should map service with MAC address in lower letters', () => {
            // Arrange
            const service = new AxisService(['192.168.1.102', '169.254.129.36'], 'Lobby', 80, 'accc8e270ad8');

            // Act
            const actual = mapFromService(service);

            // Assert
            expect(actual).toBeDefined();
            expect(actual!.macAddress).toBe('ACCC8E270AD8');
        });

        test('should not map service without MAC address', () => {
            // Arrange
            const service = new AxisService(['192.168.1.102', '169.254.129.36'], 'Lobby', 80, undefined);

            // Act
            const actual = mapFromService(service);

            // Assert
            expect(actual).toBeFalsy();
        });
    });
});
