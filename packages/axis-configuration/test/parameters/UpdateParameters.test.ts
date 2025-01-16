import { Connection, Protocol } from 'axis-core';
import { UpdateParametersError } from '../../src';
import { handleUpdateParameters, UpdateParametersRequest } from '../../src/parameters/UpdateParameters';

describe('update parameters request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 1234, 'root', 'pass');

    test('should return URL when updating single parameter', () => {
        // Arrange
        const parameters = new Map<string, string>([['Network.Bonjour.FriendlyName', 'Lobby']]);

        // Act
        const got = new UpdateParametersRequest(connection, parameters);

        // Assert
        expect(got.url).toBe('http://1.2.3.4:1234/axis-cgi/param.cgi?action=update&Network.Bonjour.FriendlyName=Lobby');
    });

    test('should return URL when updating multiple parameters', () => {
        // Arrange
        const parameters = new Map<string, string>([
            ['Network.Bonjour.FriendlyName', 'Lobby'],
            ['Network.UPnP.FriendlyName', 'Lobby'],
        ]);

        // Act
        const got = new UpdateParametersRequest(connection, parameters);

        // Assert
        expect(got.url).toBe('http://1.2.3.4:1234/axis-cgi/param.cgi?action=update&Network.Bonjour.FriendlyName=Lobby&Network.UPnP.FriendlyName=Lobby');
    });
});

describe('handle update parameter should', () => {
    test('succeed given ok response', async () => {
        // Arrange
        const res = new Response('OK');

        // Act
        await handleUpdateParameters(res);
    });

    test('throw error given updating one parameter fails', async () => {
        // Arrange
        const res = new Response("# Error: Error setting 'root.Some.Parameter' to 'some value'!");

        // Act
        const got = handleUpdateParameters(res);

        expect(got).rejects.toThrow(new UpdateParametersError(['root.Some.Parameter']));
    });

    test('throw error given updating multiple parameters fail', async () => {
        // Arrange
        const res = new Response(
            ["# Error: Error setting 'root.Some.Parameter' to 'some value'!", "# Error: Error setting 'root.Some.Other.Parameter' to 'some other value'!"].join(
                '\n',
            ),
        );

        // Act
        const got = handleUpdateParameters(res);

        // Assert
        expect(got).rejects.toThrow(new UpdateParametersError(['root.Some.Parameter', 'root.Some.Other.Parameter']));
    });
});
