import { Message } from '../../src/sockets/Message';
import { MSEARCH_MESSAGE, NOTIFY_MESSAGE } from './Message.mock';

describe('Message', () => {
    test('#remoteAddress', () => {
        // Act
        const got = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK'));

        // Assert
        expect(got.remoteAddress).toBe('192.168.1.100');
    });

    test('should trim header values', () => {
        // Act
        const got = new Message(
            '192.168.1.100',
            Buffer.from('HTTP/1.1 200 OK\r\n' + ' USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1 \r\n'),
        );

        // Assert
        expect(got.usn).toBe('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
    });

    describe('M-SEARCH response', () => {
        test('#method', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            expect(got.method).toBe('HTTP/1.1 200 OK');
        });

        test('#location', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            expect(got.location).toBe('http://192.168.1.102:45895/rootdesc1.xml');
        });

        test('#usn', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from(MSEARCH_MESSAGE));

            // Assert
            expect(got.usn).toBe('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
        });

        test('#location should fail if missing', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => got.location).toThrowError();
        });

        test('#usn should fail if missing', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => got.usn).toThrowError();
        });
    });

    describe('NOTIFY', () => {
        test('#method', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(got.method).toBe('NOTIFY * HTTP/1.1');
        });

        test('#location', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(got.location).toBe('http://192.168.1.102:45895/rootdesc1.xml');
        });

        test('#location should fail if missing', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => got.location).toThrowError();
        });

        test('#usn', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(got.usn).toBe('uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1');
        });

        test('#usn should fail if missing', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => got.usn).toThrowError();
        });

        test('#nt', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(got.nt).toBe('urn:axis-com:service:BasicService:1');
        });

        test('#nt should fail if missing', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => got.nt).toThrowError();
        });

        test('#nts', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from(NOTIFY_MESSAGE));

            // Assert
            expect(got.nts).toBe('ssdp:byebye');
        });

        test('#nts should fail if missing', () => {
            // Act
            const got = new Message('192.168.1.100', Buffer.from('HTTP/1.1 200 OK\r\n'));

            // Assert
            expect(() => got.nts).toThrowError();
        });
    });
});
