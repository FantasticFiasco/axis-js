import { EventEmitter } from 'events';

interface SocketOptions {
}

interface RemoteInfo {
}

export let socketBindCallCount: number;
export let socketCloseCallCount: number;
export let socketSendCallCount: number;

class Socket extends EventEmitter {
    bind(_port?: number, _address?: string, callback?: () => void): void {
        socketBindCallCount++;
        if (callback) {
            callback();
        }
    }

    close(callback?: () => void): void {
        socketCloseCallCount++;
        if (callback) {
            callback();
        }
    }

    send(_msg: string | Uint8Array, _offset: number, _length: number, _port?: number, _address?: string, callback?: (error: Error | null, bytes: number) => void): void {
        socketSendCallCount++;
        if (callback) {
            callback(null, 0);
        }
    }
}

export function createSocket(_options: SocketOptions, _callback?: (msg: Buffer, rinfo: RemoteInfo) => void): Socket {
    return new Socket();
}

export function mockReset() {
    socketBindCallCount = 0;
    socketCloseCallCount = 0;
    socketSendCallCount = 0;
}
