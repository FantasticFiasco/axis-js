import * as os from 'os';
import { Device } from '../src/Device';
import { NETWORK_INTERFACES_WITH_TWO_ADDRESSES } from './network-interfaces/NetworkInterface.mock';

jest.mock('os');
jest.mock('dgram');

describe('Discovery', () => {
    const osMock = jest.mocked(os);

    beforeEach(() => {
        // Mock os
        osMock.networkInterfaces.mockReturnValue(NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        // Reset manual mocks
        jest.requireMock('dgram').mockReset();
    });

    describe('#start', () => {
        test('should not send M-SEARCH messages', async () => {
            // Act
            const discovery = await createDiscovery();
            await discovery.start();

            // Assert
            const socketBindCallCount = jest.requireMock('dgram').socketBindCallCount;
            expect(socketBindCallCount).toBe(3); // 1 passive and 2 active
        });
    });

    describe('#search', () => {
        test('should send M-SEARCH messages', async () => {
            // Arrange
            const discovery = await createDiscovery();
            await discovery.start();

            // Act
            await discovery.search();

            // Assert
            const socketSendCallCount = jest.requireMock('dgram').socketSendCallCount;
            expect(socketSendCallCount).toBe(2);
        });
    });

    describe('#stop', () => {
        test('should close sockets', async () => {
            // Arrange
            const discovery = await createDiscovery();
            await discovery.start();

            // Act
            await discovery.stop();

            // Assert
            const socketCloseCallCount = jest.requireMock('dgram').socketCloseCallCount;
            expect(socketCloseCallCount).toBe(3); // 1 passive and 2 active
        });
    });

    test('#addListener', async () => {
        // Arrange
        const discovery = await createDiscovery();
        const fn = jest.fn();

        // Act
        const self = discovery.addListener('hello', fn);
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(1);
    });

    test('#on', async () => {
        // Arrange
        const discovery = await createDiscovery();
        const fn = jest.fn();

        // Act
        const self = discovery.on('hello', fn);
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(1);
    });

    test('#once', async () => {
        // Arrange
        const discovery = await createDiscovery();
        const fn = jest.fn();

        // Act
        const self = discovery.once('hello', fn);
        discovery.emit('hello', mockedDevice());
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(1);
    });

    test('#removeListener', async () => {
        // Arrange
        const discovery = await createDiscovery();
        const fn = jest.fn();

        // Act
        const self = discovery.addListener('hello', fn).removeListener('hello', fn);
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(0);
    });

    test('#off', async () => {
        // Arrange
        const discovery = await createDiscovery();
        const fn = jest.fn();

        // Act
        const self = discovery.on('hello', fn).off('hello', fn);
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(0);
    });

    test('#removeAllListeners', async () => {
        // Arrange
        const discovery = await createDiscovery();
        const fn = jest.fn();

        // Act
        const self = discovery.on('hello', fn).removeAllListeners('hello');
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(0);
    });

    test('#getMaxListeners/#setMaxListeners', async () => {
        // Arrange
        const discovery = await createDiscovery();
        const expected = 42;

        // Act
        const self = discovery.setMaxListeners(expected);
        const got = discovery.getMaxListeners();

        // Assert
        expect(self).toBe(discovery);
        expect(got).toBe(expected);
    });

    test('#listenerCount', async () => {
        // Arrange
        const discovery = await createDiscovery();
        const fn = jest.fn();
        const expected = 2;

        // Act
        const got = discovery.on('hello', fn).on('hello', fn).listenerCount('hello');

        // Assert
        expect(got).toBe(expected);
    });

    test('#prependListener', async () => {
        // Arrange
        const discovery = await createDiscovery();

        let got = '';
        const fn1 = jest.fn(() => (got += '1'));
        const fn2 = jest.fn(() => (got += '2'));

        // Act
        const self = discovery.on('hello', fn2).prependListener('hello', fn1);

        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(got).toBe('12');
    });

    test('#prependOnceListener', async () => {
        // Arrange
        const discovery = await createDiscovery();

        let got = '';
        const fn1 = jest.fn(() => (got += '1'));
        const fn2 = jest.fn(() => (got += '2'));

        // Act
        const self = discovery.on('hello', fn2).prependOnceListener('hello', fn1);
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(got).toBe('12');

        // Act
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(got).toBe('122');
    });

    describe('#eventNames', () => {
        test('no listeners', async () => {
            // Arrange
            const discovery = await createDiscovery();

            // Act
            const got = discovery.eventNames();

            // Assert
            expect([...got]).toStrictEqual([]);
        });

        test('one listener to one event', async () => {
            // Arrange
            const discovery = await createDiscovery();
            const fn = jest.fn();

            // Act
            const got = discovery.on('hello', fn).eventNames();

            // Assert
            expect([...got]).toStrictEqual(['hello']);
        });

        test('one listener to two event', async () => {
            // Arrange
            const discovery = await createDiscovery();
            const fn = jest.fn();

            // Act
            const got = discovery.on('hello', fn).on('goodbye', fn).eventNames();

            // Assert
            expect([...got]).toStrictEqual(['hello', 'goodbye']);
        });
    });
});

const createDiscovery = async () => {
    const module = await import('../src/Discovery');
    return new module.Discovery();
};

const mockedDevice = () => {
    return new Device('', 0, '', '', '', '', '', '');
};
