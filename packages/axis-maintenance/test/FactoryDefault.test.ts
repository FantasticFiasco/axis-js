import { Connection, Protocol } from 'axis-core';
import { FactoryDefaultType } from '../src';
import { FactoryDefaultRequest, handleFactoryDefault } from '../src/FactoryDefault';

describe('factory default request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 1234, 'root', 'pass');

    describe('(partial)', () => {
        test('should return URL', () => {
            // Act
            const got = new FactoryDefaultRequest(connection, FactoryDefaultType.Partial);

            // Assert
            expect(got.url).toBe('http://1.2.3.4:1234/axis-cgi/factorydefault.cgi');
        });
    });

    describe('(hard)', () => {
        test('should return URL', () => {
            // Act
            const got = new FactoryDefaultRequest(connection, FactoryDefaultType.Hard);

            // Assert
            expect(got.url).toBe('http://1.2.3.4:1234/axis-cgi/hardfactorydefault.cgi');
        });
    });
});

describe('factory default response', () => {
    describe('(partial)', () => {
        test('should not throw exception given success response', async () => {
            // Arrange
            const html = `<html>
                    <head>
                        <meta http-equiv="refresh" content="0;URL=/admin/factoryMessage.shtml?server=172.25.75.132">
                    </head>
                    <body>
                    </body>
                </html>`;

            const res = new Response(html, {
                headers: {
                    'content-type': 'text/html',
                },
            });

            // Act
            await handleFactoryDefault(res, FactoryDefaultType.Partial);
        });

        test('should throw exception given error response without body', async () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                    </body>
                </html>`;

            const res = new Response(html, {
                headers: {
                    'content-type': 'text/html',
                },
            });

            // Act
            const fn = () => handleFactoryDefault(res, FactoryDefaultType.Partial);

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });

        test('should throw exception given error response with body', async () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                        Error: Some error
                    </body>
                </html>`;

            const res = new Response(html, {
                headers: {
                    'content-type': 'text/html',
                },
            });

            // Act
            const fn = () => handleFactoryDefault(res, FactoryDefaultType.Partial);

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });
    });

    describe('(hard)', () => {
        test('should not throw exception given success response', async () => {
            // Arrange
            const html = `<html>
                    <head>
                        <meta http-equiv="refresh" content="0;URL=/admin/factoryMessage2.shtml?server=172.25.75.132">
                    </head>
                    <body>
                    </body>
                </html>`;

            const res = new Response(html, {
                headers: {
                    'content-type': 'text/html',
                },
            });

            // Act
            await handleFactoryDefault(res, FactoryDefaultType.Hard);
        });

        test('should throw exception given error response without body', async () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                    </body>
                </html>`;

            const res = new Response(html, {
                headers: {
                    'content-type': 'text/html',
                },
            });

            // Act
            const fn = () => handleFactoryDefault(res, FactoryDefaultType.Hard);

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });

        test('should throw exception given error response with body', async () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                        Error: Some error
                    </body>
                </html>`;

            const res = new Response(html, {
                headers: {
                    'content-type': 'text/html',
                },
            });

            // Act
            const fn = () => handleFactoryDefault(res, FactoryDefaultType.Hard);

            // Assert
            await expect(fn()).rejects.toThrow(Error);
        });
    });
});
