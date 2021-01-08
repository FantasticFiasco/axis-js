import { mapFromMessage } from '../../src/sockets/Mappings';
import { Message } from '../../src/sockets/Message';
import { MSEARCH_MESSAGE_WITH_LOWERCASE_MACADDRESS, NOTIFY_MESSAGE_WITH_LOWERCASE_MACADDRESS } from '../root-descriptions/Mappings.mock';
import { MSEARCH_MESSAGE, MSEARCH_MESSAGE_WITHOUT_MAC_IN_USN, NOTIFY_MESSAGE, NOTIFY_MESSAGE_WITHOUT_MAC_IN_USN } from './Message.mock';

describe('Mappings', () => {
    describe('#mapFromMessage', () => {
        test('should map Notify messages', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(NOTIFY_MESSAGE));

            // Act
            const got = mapFromMessage(message);

            // Assert
            expect(got!.address).toBe('192.168.1.102');
            expect(got!.macAddress!).toBe('ACCC8E270AD8');
            expect(got!.friendlyName).toBeFalsy();
            expect(got!.modelName).toBeFalsy();
            expect(got!.modelDescription).toBeFalsy();
            expect(got!.modelNumber).toBeFalsy();
            expect(got!.presentationURL).toBeFalsy();
        });

        test('should map Notify messages and convert MAC address to uppercase', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(NOTIFY_MESSAGE_WITH_LOWERCASE_MACADDRESS));

            // Act
            const got = mapFromMessage(message);

            // Assert
            expect(got!.macAddress!).toBe('ACCC8E270AD8');
        });

        test('should not map Notify messages without MAC in USN', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(NOTIFY_MESSAGE_WITHOUT_MAC_IN_USN));

            // Act
            const got = mapFromMessage(message);

            // Assert
            expect(got).toBeFalsy();
        });

        test('should map M-Search messages', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(MSEARCH_MESSAGE));

            // Act
            const got = mapFromMessage(message);

            // Assert
            expect(got!.address).toBe('192.168.1.102');
            expect(got!.macAddress!).toBe('ACCC8E270AD8');
            expect(got!.friendlyName).toBeFalsy();
            expect(got!.modelName).toBeFalsy();
            expect(got!.modelDescription).toBeFalsy();
            expect(got!.modelNumber).toBeFalsy();
            expect(got!.presentationURL).toBeFalsy();
        });

        test('should map M-Search messages and convert MAC address to uppercase', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(MSEARCH_MESSAGE_WITH_LOWERCASE_MACADDRESS));

            // Act
            const got = mapFromMessage(message);

            // Assert
            expect(got!.macAddress!).toBe('ACCC8E270AD8');
        });

        test('should not map M-Search messages without MAC in USN', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(MSEARCH_MESSAGE_WITHOUT_MAC_IN_USN));

            // Act
            const got = mapFromMessage(message);

            // Assert
            expect(got).toBeFalsy();
        });
    });
});
