import { Connection, Protocol } from 'axis-core';
import { SnapshotOptions } from '../src';
import { BmpRequest } from '../src/Bmp';

describe('bmp request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 1234, 'root', 'pass');

    test('should return URL without options', () => {
        // Act
        const got = new BmpRequest(connection);

        // Assert
        expect(got.url).toBe('http://1.2.3.4:1234/axis-cgi/bitmap/image.bmp');
    });

    test('should return URL with empty options', () => {
        // Arrange
        const options: SnapshotOptions = {};

        // Act
        const got = new BmpRequest(connection, options);

        // Assert
        expect(got.url).toBe('http://1.2.3.4:1234/axis-cgi/bitmap/image.bmp');
    });

    test('should return URL with falsy JavaScript values', () => {
        // Arrange
        const options: SnapshotOptions = {
            compression: 0,
            rotation: 0,
            squarepixel: 0,
        };

        // Act
        const got = new BmpRequest(connection, options);

        // Assert
        expect(got.url).toBe('http://1.2.3.4:1234/axis-cgi/bitmap/image.bmp?compression=0&rotation=0&squarepixel=0');
    });

    test('should return URL with single option', () => {
        // Arrange
        const testCases: { options: SnapshotOptions; wantQueryString: string }[] = [
            { options: { resolution: '320x240' }, wantQueryString: 'resolution=320x240' },
            { options: { camera: 1 }, wantQueryString: 'camera=1' },
            { options: { camera: 'quad' }, wantQueryString: 'camera=quad' },
            { options: { compression: 50 }, wantQueryString: 'compression=50' },
            { options: { rotation: 180 }, wantQueryString: 'rotation=180' },
            { options: { palette: 'Axis' }, wantQueryString: 'palette=Axis' },
            { options: { squarepixel: 1 }, wantQueryString: 'squarepixel=1' },
        ];

        for (const { options, wantQueryString } of testCases) {
            // Act
            const got = new BmpRequest(connection, options);

            // Assert
            expect(got.url).toBe(`http://1.2.3.4:1234/axis-cgi/bitmap/image.bmp?${wantQueryString}`);
        }
    });

    test('should return URL with multiple options', () => {
        // Arrange
        const testCases: { options: SnapshotOptions; wantQueryString: string }[] = [
            { options: { resolution: '320x240', camera: 1 }, wantQueryString: 'resolution=320x240&camera=1' },
            { options: { camera: 1, compression: 50 }, wantQueryString: 'camera=1&compression=50' },
            { options: { compression: 50, rotation: 180 }, wantQueryString: 'compression=50&rotation=180' },
            { options: { rotation: 180, palette: 'Axis' }, wantQueryString: 'rotation=180&palette=Axis' },
            { options: { palette: 'Axis', squarepixel: 1 }, wantQueryString: 'palette=Axis&squarepixel=1' },
        ];

        for (const { options, wantQueryString } of testCases) {
            // Act
            const got = new BmpRequest(connection, options);

            // Assert
            expect(got.url).toBe(`http://1.2.3.4:1234/axis-cgi/bitmap/image.bmp?${wantQueryString}`);
        }
    });

    test('should throw error when resolution option is an empty string', () => {
        // Arrange
        const options: SnapshotOptions = {
            resolution: '',
        };

        // Act
        const fn = () => new BmpRequest(connection, options);

        // Assert
        expect(fn).toThrow();
    });

    test('should throw error when palette option is an empty string', () => {
        // Arrange
        const options: SnapshotOptions = {
            palette: '',
        };

        // Act
        const fn = () => new BmpRequest(connection, options);

        // Assert
        expect(fn).toThrow();
    });
});
