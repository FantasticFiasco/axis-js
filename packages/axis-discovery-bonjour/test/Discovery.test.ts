import { Device, Discovery } from '../src';

describe('Discovery', () => {
    test('#addListener', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();

        // Act
        const self = discovery.addListener('hello', fn());
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
        const self = discovery.on('hello', fn());
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
        const self = discovery.once('hello', fn());
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
        const self = discovery.addListener('hello', fn()).removeListener('hello', fn());
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
        const self = discovery.on('hello', fn()).off('hello', fn());
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
        const self = discovery.on('hello', fn()).removeAllListeners('hello');
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
        const got = discovery.getMaxListeners();

        // Assert
        expect(self).toBe(discovery);
        expect(got).toBe(expected);
    });

    test('#listenerCount', () => {
        // Arrange
        const discovery = new Discovery();
        const fn = jest.fn();
        const expected = 2;

        // Act
        const got = discovery.on('hello', fn()).on('hello', fn()).listenerCount('hello');

        // Assert
        expect(got).toBe(expected);
    });

    test('#prependListener', () => {
        // Arrange
        const discovery = new Discovery();

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

    test('#prependOnceListener', () => {
        // Arrange
        const discovery = new Discovery();

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
        test('no listeners', () => {
            // Arrange
            const discovery = new Discovery();

            // Act
            const got = discovery.eventNames();

            // Assert
            expect([...got]).toStrictEqual([]);
        });

        test('one listener to one event', () => {
            // Arrange
            const discovery = new Discovery();
            const fn = jest.fn();

            // Act
            const got = discovery.on('hello', fn()).eventNames();

            // Assert
            expect([...got]).toStrictEqual(['hello']);
        });

        test('one listener to two event', () => {
            // Arrange
            const discovery = new Discovery();
            const fn = jest.fn();

            // Act
            const got = discovery.on('hello', fn()).on('goodbye', fn()).eventNames();

            // Assert
            expect([...got]).toStrictEqual(['hello', 'goodbye']);
        });
    });
});

const mockedDevice = () => {
    return new Device('', '', 0, '', '');
};
