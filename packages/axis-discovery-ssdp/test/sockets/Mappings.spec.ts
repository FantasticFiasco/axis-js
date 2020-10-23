import { mapFromMessage } from './../../src/sockets/Mappings';
import { Message } from './../../src/sockets/Message';
import { MSEARCH_MESSAGE_WITH_LOWERCASE_MACADDRESS, NOTIFY_MESSAGE_WITH_LOWERCASE_MACADDRESS } from './../root-descriptions/Mappings.mock';
import { MSEARCH_MESSAGE, MSEARCH_MESSAGE_WITHOUT_MAC_IN_USN, NOTIFY_MESSAGE, NOTIFY_MESSAGE_WITHOUT_MAC_IN_USN } from './Message.mock';

describe('Mappings', () => {
    describe('#mapFromMessage', () => {
        test('should map Notify messages', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(NOTIFY_MESSAGE));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            expect(actual!.address).toBe('192.168.1.102');
            expect(actual!.macAddress!).toBe('ACCC8E270AD8');
            expect(actual!.friendlyName).toBeFalsy();
            expect(actual!.modelName).toBeFalsy();
            expect(actual!.modelDescription).toBeFalsy();
            expect(actual!.modelNumber).toBeFalsy();
            expect(actual!.presentationURL).toBeFalsy();
        });

        test('should map Notify messages and convert MAC address to uppercase', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(NOTIFY_MESSAGE_WITH_LOWERCASE_MACADDRESS));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            expect(actual!.macAddress!).toBe('ACCC8E270AD8');
        });

        test('should not map Notify messages without MAC in USN', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(NOTIFY_MESSAGE_WITHOUT_MAC_IN_USN));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            expect(actual).toBeFalsy();
        });

        test('should map M-Search messages', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(MSEARCH_MESSAGE));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            expect(actual!.address).toBe('192.168.1.102');
            expect(actual!.macAddress!).toBe('ACCC8E270AD8');
            expect(actual!.friendlyName).toBeFalsy();
            expect(actual!.modelName).toBeFalsy();
            expect(actual!.modelDescription).toBeFalsy();
            expect(actual!.modelNumber).toBeFalsy();
            expect(actual!.presentationURL).toBeFalsy();
        });

        test('should map M-Search messages and convert MAC address to uppercase', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(MSEARCH_MESSAGE_WITH_LOWERCASE_MACADDRESS));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            expect(actual!.macAddress!).toBe('ACCC8E270AD8');
        });

        test('should not map M-Search messages without MAC in USN', () => {
            // Arrange
            const message = new Message('192.168.1.102', Buffer.from(MSEARCH_MESSAGE_WITHOUT_MAC_IN_USN));

            // Act
            const actual = mapFromMessage(message);

            // Assert
            expect(actual).toBeFalsy();
        });
    });
});
