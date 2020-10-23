import { Message } from './../../src/sockets/Message';
import { MSEARCH_MESSAGE, NOTIFY_MESSAGE } from './Message.mock';

describe('Message', () => {
    test('#remoteAddress', () => {
        // Arrange
        const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK'));

        // Assert
        expect(subject.remoteAddress).toBe('192.168.1.100');
    });

    test('should trim header values', () => {
        // Arrange
        const subject = new Message(
            '192.168.1.100',
            Buffer.from('HTTP/1.1 200 OK\r\n' + ' USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1 \r\n')
        );

        // Assert
        expect(subject.usn).toBe('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
    });

    describe('M-SEARCH response', () => {
        test('#method', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            expect(subject.method).toBe('HTTP/1.1 200 OK');
        });

        test('#location', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            expect(subject.location).toBe('http://192.168.1.102:45895/rootdesc1.xml');
        });

        test('#usn', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            expect(subject.usn).toBe('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
        });

        test('#location should fail if missing', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => subject.location).toThrowError();
        });

        test('#usn should fail if missing', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => subject.usn).toThrowError();
        });
    });

    describe('NOTIFY', () => {
        test('#method', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(subject.method).toBe('NOTIFY * HTTP/1.1');
        });

        test('#location', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(subject.location).toBe('http://192.168.1.102:45895/rootdesc1.xml');
        });

        test('#location should fail if missing', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => subject.location).toThrowError();
        });

        test('#usn', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(subject.usn).toBe('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
        });

        test('#usn should fail if missing', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => subject.usn).toThrowError();
        });

        test('#nt', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(subject.nt).toBe('urn:axis-com:service:BasicService:1');
        });

        test('#nt should fail if missing', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => subject.nt).toThrowError();
        });

        test('#nts', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(subject.nts).toBe('ssdp:byebye');
        });

        test('#nts should fail if missing', () => {
            // Arrange
            const subject = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => subject.nts).toThrowError();
        });
    });
});
