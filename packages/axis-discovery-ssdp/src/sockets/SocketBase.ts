import * as expect from '@fantasticfiasco/expect';
import { createSocket, Socket } from 'dgram';
import { EventEmitter } from 'events';
import { AddressInfo } from 'net';
import { log } from '../logging';

export abstract class SocketBase extends EventEmitter {
    protected _socket?: Socket;

    /**
     * Start listen for advertisements.
     */
    public async start(): Promise<void> {
        expect.toNotExist(this._socket, 'Socket has already been started');

        this._socket = createSocket({ type: 'udp4', reuseAddr: true });
        this._socket.on('listening', () => this.onListening());
        this._socket.on('message', (message: Buffer, remote: AddressInfo) => this.onMessage(message, remote));
        this._socket.on('error', (error: Error) => this.onError(error));

        await this.bind();
    }

    /**
     * Stop listen for advertisements.
     */
    public stop(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (!this._socket) {
                throw new Error('Socket has never been started');
            }

            this._socket.close(() => resolve());
        });
    }

    protected abstract onListening(): void;

    protected abstract onMessage(messageBuffer: Buffer, remote: AddressInfo): void;

    protected abstract bind(): Promise<void>;

    protected onError(error: Error): void {
        log('SocketBase#onError - %o', error);
    }
}
