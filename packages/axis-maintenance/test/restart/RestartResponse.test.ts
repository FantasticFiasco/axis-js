import { RestartResponse } from '../../src/restart/RestartResponse';

describe('restart response', () => {
    describe('#assertSuccess', () => {
        test('should not throw exception given success response', () => {
            // Arrange
            const html = `<html>
                    <head>
                        <meta http-equiv="refresh" content="0;URL=/admin/restartMessage.shtml?server=172.25.75.132">
                    </head>
                    <body>
                    </body>
                </html>`;

            const res = new RestartResponse(html);

            // Act
            const fn = () => res.assertSuccess();

            // Assert
            expect(fn()).not.toThrow();
        });

        test('should throw exception given error response without body', () => {
            // Arrange
            const html = `<html>
                    <head>
                    </head>
                    <body>
                    </body>
                </html>`;

            const res = new RestartResponse(html);

            // Act
            const fn = () => res.assertSuccess();

            // Assert
            expect(fn()).toThrow(Error);
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

            const res = new RestartResponse(html);

            // Act
            const fn = () => res.assertSuccess();

            // Assert
            expect(fn()).toThrow(Error);
        });
    });
});
