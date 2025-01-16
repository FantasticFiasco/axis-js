import { AddressInfo } from 'net';
import { log } from '../logging';
import { SSDP_MULTICAST_ADDRESS, SSDP_PORT } from './Constants';
import { Message } from './Message';
import { SocketBase } from './SocketBase';

/**
 * Class representing a SSDP socket that support the HTTP method NOTIFY.
 */
export class NotifySocket extends SocketBase {
    /**
     * Initializes a new instance of the class.
     * @param addresses The network addresses to listen for NOTIFY
     * advertisements on.
     */
    constructor(private readonly addresses: string[]) {
        super();
    }

    protected onListening(): void {
        if (!this._socket) {
            throw new Error('Notify socket has never been started');
        }

        log('NotifySocket#onListening - %s:%d', this._socket.address().address, this._socket.address().port);

        for (const address of this.addresses) {
            log('NotifySocket#onListening - add membership to %s', address);
            try {
                this._socket.addMembership(SSDP_MULTICAST_ADDRESS, address);
            } catch (error) {
                log('NotifySocket#onListening - %o', error);
            }
        }
    }

    protected onMessage(messageBuffer: Buffer, remote: AddressInfo): void {
        const message = new Message(remote.address, messageBuffer);

        if (message.method !== 'NOTIFY * HTTP/1.1' || message.nt !== 'urn:axis-com:service:BasicService:1') {
            return;
        }

        if (message.nts === 'ssdp:alive') {
            this.emit('hello', message);
        } else if (message.nts === 'ssdp:byebye') {
            this.emit('goodbye', message);
        }
    }

    protected bind(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (!this._socket) {
                throw new Error('Notify socket has never been started');
            }

            this._socket.bind(SSDP_PORT, undefined, () => resolve());
        });
    }
}
