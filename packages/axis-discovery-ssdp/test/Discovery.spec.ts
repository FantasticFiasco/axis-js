import * as os from 'os';
import { mocked } from 'ts-jest/utils';
import { Device, Discovery } from './../src/';
import { NETWORK_INTERFACES_WITH_TWO_ADDRESSES } from './network-interfaces/NetworkInterface.mock';

jest.mock('os');
jest.mock('dgram');

describe('Discovery', () => {
    const osMock = mocked(os);
    let discovery: Discovery;

    beforeEach(() => {
        // Mock os
        osMock.networkInterfaces.mockReturnValue(NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        // Reset manual mocks
        jest.requireMock('dgram').mockReset();

        // Create discovery
        discovery = new Discovery();
    });

    describe('#start', () => {
        test('should not send M-SEARCH messages', async () => {
            // Act
            await discovery.start();

            // Assert
            const socketBindCallCount = jest.requireMock('dgram').socketBindCallCount;
            expect(socketBindCallCount).toBe(3); // 1 passive and 2 active
        });
    });

    describe('#search', () => {
        test('should send M-SEARCH messages', async () => {
            // Arrange
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
            await discovery.start();

            // Act
            await discovery.stop();

            // Assert
            const socketCloseCallCount = jest.requireMock('dgram').socketCloseCallCount;
            expect(socketCloseCallCount).toBe(3); // 1 passive and 2 active
        });
    });

    test('#addListener', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();

        // Act
        const self = discovery.addListener('hello', fn);
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(1);
    });

    test('#on', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();

        // Act
        const self = discovery.on('hello', fn);
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(1);
    });

    test('#once', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();

        // Act
        const self = discovery.once('hello', fn);
        discovery.emit('hello', mockedDevice());
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(1);
    });

    test('#removeListener', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();

        // Act
        const self = discovery.addListener('hello', fn).removeListener('hello', fn);

        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(0);
    });

    test('#off', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();

        // Act
        const self = discovery.on('hello', fn).off('hello', fn);

        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(0);
    });

    test('#removeAllListeners', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();

        // Act
        const self = discovery.on('hello', fn).removeAllListeners('hello');

        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(fn.mock.calls.length).toBe(0);
    });

    test('#getMaxListeners/#setMaxListeners', () => {
        // Arrange
        const discovery = new Discovery();
        const expected = 42;

        // Act
        const self = discovery.setMaxListeners(expected);
        const actual = discovery.getMaxListeners();

        // Assert
        expect(self).toBe(discovery);
        expect(actual).toBe(expected);
    });

    test('#listenerCount', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();
        const expected = 2;

        // Act
        const actual = discovery.on('hello', fn).on('hello', fn).listenerCount('hello');

        // Assert
        expect(actual).toBe(expected);
    });

    test('#prependListener', () => {
        // Arrange
        const discovery = new Discovery();

        let actual = '';
        const fn1 = jest.fn(() => (actual += '1'));
        const fn2 = jest.fn(() => (actual += '2'));

        // Act
        const self = discovery.on('hello', fn2).prependListener('hello', fn1);

        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(actual).toBe('12');
    });

    test('#prependOnceListener', () => {
        // Arrange
        const discovery = new Discovery();

        let actual = '';
        const fn1 = jest.fn(() => (actual += '1'));
        const fn2 = jest.fn(() => (actual += '2'));

        // Act
        const self = discovery.on('hello', fn2).prependOnceListener('hello', fn1);

        discovery.emit('hello', mockedDevice());

        // Assert
        expect(self).toBe(discovery);
        expect(actual).toBe('12');

        // Act
        discovery.emit('hello', mockedDevice());

        // Assert
        expect(actual).toBe('122');
    });

    describe('#eventNames', () => {
        test('no listeners', () => {
            // Arrange
            const discovery = new Discovery();

            // Act
            const actual = discovery.eventNames();

            // Assert
            expect([...actual]).toStrictEqual([]);
        });

        test('one listener to one event', () => {
            // Arrange
            const discovery = new Discovery();
            const fn = jest.fn();

            // Act
            const actual = discovery.on('hello', fn).eventNames();

            // Assert
            expect([...actual]).toStrictEqual(['hello']);
        });

        test('one listener to two event', () => {
            // Arrange
            const discovery = new Discovery();
            const fn = jest.fn();

            // Act
            const actual = discovery.on('hello', fn).on('goodbye', fn).eventNames();

            // Assert
            expect([...actual]).toStrictEqual(['hello', 'goodbye']);
        });
    });
});

const mockedDevice = () => {
    return new Device('', 0, '', '', '', '', '', '');
};
