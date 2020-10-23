import { FactoryDefaultType, UnknownError } from './../../src';
import { FactoryDefaultResponse } from './../../src/factory-default/FactoryDefaultResponse';

describe('factory default response', () => {
    describe('#assertSuccess (partial)', () => {
        test('should not throw exception given success response', () => {
            // Arrange
            const html = `<html>
                    <head>
                        <meta http-equiv="refresh" content="0;URL=/admin/factoryMessage.shtml?server=172.25.75.132">
                    </head>
                    <body>
                    </body>
                </html>`;

            const response = new FactoryDefaultResponse(html, FactoryDefaultType.Partial);

            // Act
            const fn = () => response.assertSuccess();

            // Assert
            expect(fn).not.toThrowError();
        });

        test('should throw exception given error response without body', () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                    </body>
                </html>`;

            const response = new FactoryDefaultResponse(html, FactoryDefaultType.Partial);

            // Act
            const fn = () => response.assertSuccess();

            // Assert
            expect(fn).toThrowError(UnknownError);
        });

        test('should throw exception given error response with body', () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                        Error: Some error
                    </body>
                </html>`;

            const response = new FactoryDefaultResponse(html, FactoryDefaultType.Partial);

            // Act
            const fn = () => response.assertSuccess();

            // Assert
            expect(fn).toThrowError(UnknownError);
        });
    });

    describe('#assertSuccess (hard)', () => {
        test('should not throw exception given success response', () => {
            // Arrange
            const html = `<html>
                    <head>
                        <meta http-equiv="refresh" content="0;URL=/admin/factoryMessage2.shtml?server=172.25.75.132">
                    </head>
                    <body>
                    </body>
                </html>`;

            const response = new FactoryDefaultResponse(html, FactoryDefaultType.Hard);

            // Act
            const fn = () => response.assertSuccess();

            // Assert
            expect(fn).not.toThrowError();
        });

        test('should throw exception given error response without body', () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                    </body>
                </html>`;

            const response = new FactoryDefaultResponse(html, FactoryDefaultType.Hard);

            // Act
            const fn = () => response.assertSuccess();

            // Assert
            expect(fn).toThrowError(UnknownError);
        });

        test('should throw exception given error response with body', () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                        Error: Some error
                    </body>
                </html>`;

            const response = new FactoryDefaultResponse(html, FactoryDefaultType.Hard);

            // Act
            const fn = () => response.assertSuccess();

            // Assert
            expect(fn).toThrowError(UnknownError);
        });
    });
});
