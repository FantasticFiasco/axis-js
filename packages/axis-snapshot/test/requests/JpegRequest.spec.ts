import { Connection, Protocol, SnapshotOptions } from './../../src';
import { JpegRequest } from './../../src/requests/JpegRequest';

describe('get parameters request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    describe('#url', () => {
        test('should return URL without options', () => {
            // Act
            const request = new JpegRequest(connection);

            // Assert
            expect(request.url).toBe(`${connection.url}/axis-cgi/jpg/image.cgi`);
        });

        test('should return URL with empty options', () => {
            // Arrange
            const options: SnapshotOptions = {};

            // Act
            const request = new JpegRequest(connection, options);

            // Assert
            expect(request.url).toBe(`${connection.url}/axis-cgi/jpg/image.cgi`);
        });

        test('should return URL with falsy JavaScript values', () => {
            // Arrange
            const options: SnapshotOptions = {
                compression: 0,
                rotation: 0,
                squarepixel: 0,
            };

            // Act
            const request = new JpegRequest(connection, options);

            // Assert
            expect(request.url).toBe(`${connection.url}/axis-cgi/jpg/image.cgi?compression=0&rotation=0&squarepixel=0`);
        });

        test('should return URL with single option', () => {
            // Arrange
            const testCases: { options: SnapshotOptions; expectedQueryString: string }[] = [
                { options: { resolution: '320x240' }, expectedQueryString: 'resolution=320x240' },
                { options: { camera: 1 }, expectedQueryString: 'camera=1' },
                { options: { camera: 'quad' }, expectedQueryString: 'camera=quad' },
                { options: { compression: 50 }, expectedQueryString: 'compression=50' },
                { options: { rotation: 180 }, expectedQueryString: 'rotation=180' },
                { options: { palette: 'Axis' }, expectedQueryString: 'palette=Axis' },
                { options: { squarepixel: 1 }, expectedQueryString: 'squarepixel=1' },
            ];

            for (const { options, expectedQueryString } of testCases) {
                // Act
                const request = new JpegRequest(connection, options);

                // Assert
                expect(request.url).toBe(`${connection.url}/axis-cgi/jpg/image.cgi?${expectedQueryString}`);
            }
        });

        test('should return URL with multiple options', () => {
            // Arrange
            const testCases: { options: SnapshotOptions; expectedQueryString: string }[] = [
                { options: { resolution: '320x240', camera: 1 }, expectedQueryString: 'resolution=320x240&camera=1' },
                { options: { camera: 1, compression: 50 }, expectedQueryString: 'camera=1&compression=50' },
                { options: { compression: 50, rotation: 180 }, expectedQueryString: 'compression=50&rotation=180' },
                { options: { rotation: 180, palette: 'Axis' }, expectedQueryString: 'rotation=180&palette=Axis' },
                { options: { palette: 'Axis', squarepixel: 1 }, expectedQueryString: 'palette=Axis&squarepixel=1' },
            ];

            for (const { options, expectedQueryString } of testCases) {
                // Act
                const request = new JpegRequest(connection, options);

                // Assert
                expect(request.url).toBe(`${connection.url}/axis-cgi/jpg/image.cgi?${expectedQueryString}`);
            }
        });

        test('should throw error when resolution option is an empty string', () => {
            // Arrange
            const options: SnapshotOptions = {
                resolution: '',
            };

            // Act
            const request = new JpegRequest(connection, options);

            // Assert
            expect(() => request.url).toThrow();
        });

        test('should throw error when palette option is an empty string', () => {
            // Arrange
            const options: SnapshotOptions = {
                palette: '',
            };

            // Act
            const request = new JpegRequest(connection, options);

            // Assert
            expect(() => request.url).toThrow();
        });
    });
});
