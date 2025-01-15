import { Connection, Protocol } from 'axis-core';
import { handleRestart, RestartRequest } from '../src/Restart';

describe('restart request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 1234, 'root', 'pass');

    test('should return URL', () => {
        // Act
        const got = new RestartRequest(connection);

        // Assert
        expect(got.url).toBe('http://1.2.3.4:1234/axis-cgi/restart.cgi');
    });
});

describe('restart response', () => {
    test('should not throw exception given success response', async () => {
        // Arrange
        const html = `<html>
                    <head>
                        <meta http-equiv="refresh" content="0;URL=/admin/restartMessage.shtml?server=172.25.75.132">
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
        await handleRestart(res);
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
        const fn = () => handleRestart(res);

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
        const fn = () => handleRestart(res);

        // Assert
        await expect(fn()).rejects.toThrow(Error);
    });
});
