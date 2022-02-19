import { Connection, Protocol } from 'axis-core';
import { UpdateParametersRequest } from '../../../src/parameters/request-response/UpdateParametersRequest';

describe('update parameters request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    describe('#url', () => {
        test('should return URL when updating single parameter', () => {
            // Arrange
            const parameters = {
                'Network.Bonjour.FriendlyName': 'Lobby',
            };

            // Act
            const got = new UpdateParametersRequest(connection, parameters);

            // Assert
            expect(got.relativePath).toBe('/axis-cgi/param.cgi?action=update&Network.Bonjour.FriendlyName=Lobby');
        });

        test('should return URL when updating multiple parameters', () => {
            // Arrange
            const parameters = {
                'Network.Bonjour.FriendlyName': 'Lobby',
                'Network.UPnP.FriendlyName': 'Lobby',
            };

            // Act
            const got = new UpdateParametersRequest(connection, parameters);

            // Assert
            expect(got.relativePath).toBe('/axis-cgi/param.cgi?action=update&Network.Bonjour.FriendlyName=Lobby&Network.UPnP.FriendlyName=Lobby');
        });
    });
});
