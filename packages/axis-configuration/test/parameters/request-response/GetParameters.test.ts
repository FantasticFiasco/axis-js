import { Connection, Protocol } from 'axis-core';
import { GetParametersRequest, handleGetParameters } from '../../../src/parameters/GetParameters';

describe('get parameters request', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');

    test('should return URL when getting all parameters', () => {
        // Act
        const got = new GetParametersRequest(connection, 'all');

        // Assert
        expect(got.url).toBe('http://1.2.3.4/axis-cgi/param.cgi?action=list&responseformat=rfc');
    });

    test('should return URL when getting single parameter', () => {
        // Act
        const got = new GetParametersRequest(connection, ['Network.UPnP.FriendlyName']);

        // Assert
        expect(got.url).toBe('http://1.2.3.4/axis-cgi/param.cgi?action=list&group=Network.UPnP.FriendlyName&responseformat=rfc');
    });

    test('should return URL when getting multiple parameters', () => {
        // Act
        const got = new GetParametersRequest(connection, ['Network.UPnP.FriendlyName', 'Properties.API.HTTP.Version']);

        // Assert
        expect(got.url).toBe('http://1.2.3.4/axis-cgi/param.cgi?action=list&group=Network.UPnP.FriendlyName,Properties.API.HTTP.Version&responseformat=rfc');
    });

    test('should return URL when getting single group', () => {
        // Act
        const got = new GetParametersRequest(connection, ['Network']);

        // Assert
        expect(got.url).toBe('http://1.2.3.4/axis-cgi/param.cgi?action=list&group=Network&responseformat=rfc');
    });

    test('should return URL when getting multiple groups', () => {
        // Act
        const got = new GetParametersRequest(connection, ['Network', 'Properties']);

        // Assert
        expect(got.url).toBe('http://1.2.3.4/axis-cgi/param.cgi?action=list&group=Network,Properties&responseformat=rfc');
    });

    test('should return URL when getting single group with wildcard', () => {
        // Act
        const got = new GetParametersRequest(connection, ['Network.*.FriendlyName']);

        // Assert
        expect(got.url).toBe('http://1.2.3.4/axis-cgi/param.cgi?action=list&group=Network.*.FriendlyName&responseformat=rfc');
    });

    test('should return URL when getting multiple groups with wildcards', () => {
        // Act
        const got = new GetParametersRequest(connection, ['Network.*.FriendlyName', 'Properties.API.*.Version']);

        // Assert
        expect(got.url).toBe('http://1.2.3.4/axis-cgi/param.cgi?action=list&group=Network.*.FriendlyName,Properties.API.*.Version&responseformat=rfc');
    });
});

describe('handle get parameters should', () => {
    test('return single parameter', async () => {
        // Arrange
        const res = new Response('root.Some.Parameter=some value');

        // Act
        const got = await handleGetParameters(res);

        // Assert
        expect(got).toStrictEqual(new Map<string, string>([['Some.Parameter', 'some value']]));
    });

    test('return multiple parameters', async () => {
        // Arrange
        const res = new Response(['root.Some.Parameter=some value', 'root.Some.Other.Parameter=some other value'].join('\n'));

        // Act
        const got = await handleGetParameters(res);

        // Assert
        expect(got).toStrictEqual(
            new Map<string, string>([
                ['Some.Parameter', 'some value'],
                ['Some.Other.Parameter', 'some other value'],
            ]),
        );
    });

    test('not return parameter with error', async () => {
        // Arrange
        const res = new Response(['root.Some.Parameter=some value', '# Error: some error'].join('\n'));

        // Act
        const got = await handleGetParameters(res);

        // Assert
        expect(got).toStrictEqual(new Map<string, string>([['Some.Parameter', 'some value']]));
    });

    test('not return invalid parameter', async () => {
        // Arrange
        const res = new Response(['root.Some.Parameter=some value', 'root.Some.Invalid.Parameter?some value'].join('\n'));

        // Act
        const got = await handleGetParameters(res);

        // Assert
        expect(got).toStrictEqual(new Map<string, string>([['Some.Parameter', 'some value']]));
    });
});
