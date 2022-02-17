import { Connection, Protocol } from 'axis-core';
import { GetParametersRequest } from '../../../src/parameters/request-response/GetParametersRequest';

describe('get parameters request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    describe('#url', () => {
        test('should return URL when getting all parameters', () => {
            // Act
            const got = new GetParametersRequest(connection);

            // Assert
            expect(got.url).toBe(`${connection.url}/axis-cgi/param.cgi?action=list&responseformat=rfc`);
        });

        test('should return URL when getting single parameter', () => {
            // Act
            const got = new GetParametersRequest(connection, 'Network.UPnP.FriendlyName');

            // Assert
            expect(got.url).toBe(`${connection.url}/axis-cgi/param.cgi?action=list&group=Network.UPnP.FriendlyName&responseformat=rfc`);
        });

        test('should return URL when getting multiple parameters', () => {
            // Act
            const got = new GetParametersRequest(connection, 'Network.UPnP.FriendlyName', 'Properties.API.HTTP.Version');

            // Assert
            expect(got.url).toBe(
                `${connection.url}/axis-cgi/param.cgi?action=list&group=Network.UPnP.FriendlyName,Properties.API.HTTP.Version&responseformat=rfc`
            );
        });

        test('should return URL when getting single group', () => {
            // Act
            const got = new GetParametersRequest(connection, 'Network');

            // Assert
            expect(got.url).toBe(`${connection.url}/axis-cgi/param.cgi?action=list&group=Network&responseformat=rfc`);
        });

        test('should return URL when getting multiple groups', () => {
            // Act
            const got = new GetParametersRequest(connection, 'Network', 'Properties');

            // Assert
            expect(got.url).toBe(`${connection.url}/axis-cgi/param.cgi?action=list&group=Network,Properties&responseformat=rfc`);
        });

        test('should return URL when getting single group with wildcard', () => {
            // Act
            const got = new GetParametersRequest(connection, 'Network.*.FriendlyName');

            // Assert
            expect(got.url).toBe(`${connection.url}/axis-cgi/param.cgi?action=list&group=Network.*.FriendlyName&responseformat=rfc`);
        });

        test('should return URL when getting multiple groups with wildcards', () => {
            // Act
            const got = new GetParametersRequest(connection, 'Network.*.FriendlyName', 'Properties.API.*.Version');

            // Assert
            expect(got.url).toBe(`${connection.url}/axis-cgi/param.cgi?action=list&group=Network.*.FriendlyName,Properties.API.*.Version&responseformat=rfc`);
        });
    });
});
