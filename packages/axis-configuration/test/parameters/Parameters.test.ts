import { ExpectationError } from '@fantasticfiasco/expect';
import { Connection, Protocol } from 'axis-core';
import { Parameters } from '../../src';
import { DeviceMock } from '../DeviceMock';

var device: DeviceMock;

beforeAll(async () => {
    device = new DeviceMock();
    await device.listen('127.0.0.1', 0);
});

afterAll(async () => {
    await device.close();
});

describe('#get', () => {
    test('should get single parameter', async () => {
        // Arrange
        const connection = createConnection();
        const parameters = new Parameters(connection);

        const name = 'Network.Bonjour.FriendlyName';
        const value = 'Main Entrance';

        // Act
        const got = await parameters.get(name);

        // Assert
        const want = new Map<string, string>([[name, value]]);
        expect(got).toStrictEqual(want);
    });

    test('should get multiple parameters', async () => {
        // Arrange
        const connection = createConnection();
        const parameters = new Parameters(connection);

        const name1 = 'Network.Bonjour.FriendlyName';
        const value1 = 'Main Entrance';
        const name2 = 'Network.Bonjour.Enabled';
        const value2 = 'yes';

        // Act
        const got = await parameters.get(name1, name2);

        // Assert
        const want = new Map<string, string>([
            [name1, value1],
            [name2, value2],
        ]);
        expect(got).toStrictEqual(want);
    });

    test('should not get single unknown parameter', async () => {
        // Arrange
        const connection = createConnection();
        const parameters = new Parameters(connection);

        const name = 'Unknown.Parameter';

        // Act
        const got = await parameters.get(name);

        // Assert
        const want = new Map<string, string>();
        expect(got).toStrictEqual(want);
    });

    test('should not get multiple unknown parameters', async () => {
        // Arrange
        const connection = createConnection();
        const parameters = new Parameters(connection);

        const name1 = 'Unknown.Parameter1';
        const name2 = 'Unknown.Parameter2';

        // Act
        const got = await parameters.get(name1, name2);

        // Assert
        const want = new Map<string, string>();
        expect(got).toStrictEqual(want);
    });

    test('should get a mixture of known and unknown parameters', async () => {
        // Arrange
        const connection = createConnection();
        const parameters = new Parameters(connection);

        const name1 = 'Network.Bonjour.FriendlyName';
        const value1 = 'Main Entrance';
        const name2 = 'Unknown.Parameter';

        // Act
        const got = await parameters.get(name1, name2);

        // Assert
        const want = new Map<string, string>([[name1, value1]]);
        expect(got).toStrictEqual(want);
    });

    test('should throw exception if no parameter is specified', async () => {
        // Arrange
        const connection = createConnection();
        const parameters = new Parameters(connection);

        // Act
        const fn = () => parameters.get();

        // Assert
        await expect(fn).rejects.toBeInstanceOf(ExpectationError);
    });

    // test('should throw exception if device is unresponsive', async () => {
    //     // Arrange
    //     // nock(connection.url)
    //     //     .get(/param.cgi\?action=list/)
    //     //     .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

    //     try {
    //         // Act
    //         await parameters.get('Network.Bonjour.FriendlyName');
    //         throw new Error('This exception should not be thrown');
    //     } catch (error) {
    //         // Assert
    //         expect(error).toBeInstanceOf(Error);
    //     }
    // });

    test('should throw exception if user is unauthorized', async () => {
        // Arrange
        const connection = createConnection('wrong-password');
        const parameters = new Parameters(connection);

        const fn = () => parameters.get('Network.Bonjour.FriendlyName');

        // Assert
        await expect(fn).rejects.toBeInstanceOf(Error);
    });
});

// describe('#update', () => {
//     const connection = createConnection();
//     const parameters = new Parameters(connection);

//     test('should update single parameter', async () => {
//         // Arrange
//         // const scope = nock(connection.url)
//         //     .get(/param.cgi\?action=update/)
//         //     .reply(200, 'OK');

//         // Act
//         await parameters.update({ 'Network.Bonjour.FriendlyName': 'Main Entrance' });

//         // Assert
//         // expect(scope.isDone()).toBe(true);
//     });

//     test('should update multiple parameters', async () => {
//         // Arrange
//         // const scope = nock(connection.url)
//         //     .get(/param.cgi\?action=update/)
//         //     .reply(200, 'OK');

//         // Act
//         await parameters.update({
//             'Network.Bonjour.FriendlyName': 'Main Entrance',
//             'Network.Bonjour.Enabled': 'yes',
//         });

//         // Assert
//         // expect(scope.isDone()).toBe(true);
//     });

//     test('should not update single unknown parameter', async () => {
//         // Arrange
//         const name = 'Unknown.Parameter';
//         const value = 'Value';

//         // nock(connection.url)
//         //     .get(/param.cgi\?action=update/)
//         //     .reply(200, `# Error: Error setting '${name}' to '${value}'!\r\n`);

//         try {
//             // Act
//             await parameters.update({ [name]: value });
//             throw new Error('This exception should not be thrown');
//         } catch (error) {
//             // Assert
//             expect(error).toBeInstanceOf(UpdateParametersError);
//             expect((error as UpdateParametersError).parameterNames).toEqual([name]);
//         }
//     });

//     test('should not update multiple unknown parameters', async () => {
//         // Arrange
//         const name1 = 'Unknown.Parameter1';
//         const value1 = 'Value1';
//         const name2 = 'Unknown.Parameter2';
//         const value2 = 'Value2';

//         // nock(connection.url)
//         //     .get(/param.cgi\?action=update/)
//         //     .reply(200, `# Error: Error setting '${name1}' to '${value1}'!\r\n# Error: Error setting '${name2}' to '${value2}'!\r\n`);

//         try {
//             // Act
//             await parameters.update({ [name1]: value1, [name2]: value2 });
//             throw new Error('This exception should not be thrown');
//         } catch (error) {
//             // Assert
//             expect(error).toBeInstanceOf(UpdateParametersError);
//             expect((error as UpdateParametersError).parameterNames).toEqual([name1, name2]);
//         }
//     });

//     test('should update a mixture of known and unknown parameters', async () => {
//         // Arrange
//         const name = 'Unknown.Parameter';
//         const value = 'Value';

//         // nock(connection.url)
//         //     .get(/param.cgi\?action=update/)
//         //     .reply(200, `# Error: Error setting '${name}' to '${value}'!\r\n`);

//         try {
//             // Act
//             await parameters.update({ 'Network.Bonjour.FriendlyName': 'Main Entrance', name: value });
//             throw new Error('This exception should not be thrown');
//         } catch (error) {
//             // Assert
//             expect(error).toBeInstanceOf(UpdateParametersError);
//             expect((error as UpdateParametersError).parameterNames).toEqual([name]);
//         }
//     });

//     test('should throw exception if no parameters are specified', async () => {
//         try {
//             // Act
//             await parameters.update({});
//             throw new Error('This exception should not be thrown');
//         } catch (error) {
//             // Assert
//             expect(error).toBeInstanceOf(ExpectationError);
//         }
//     });

//     test('should throw exception if device is unresponsive', async () => {
//         // Arrange
//         // nock(connection.url)
//         //     .get(/param.cgi\?action=update/)
//         //     .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

//         try {
//             // Act
//             await parameters.update({ 'Network.Bonjour.FriendlyName': 'Main Entrance' });
//             throw new Error('This exception should not be thrown');
//         } catch (error) {
//             // Assert
//             expect(error).toBeInstanceOf(Error);
//         }
//     });

//     test('should throw exception if user is unauthorized', async () => {
//         // Arrange
//         // nock(connection.url)
//         //     .get(/param.cgi\?action=update/)
//         //     .reply(401);

//         try {
//             // Act
//             await parameters.update({ 'Network.Bonjour.FriendlyName': 'Main Entrance' });
//             throw new Error('This exception should not be thrown');
//         } catch (error) {
//             // Assert
//             expect(error).toBeInstanceOf(Error);
//         }
//     });
// });

const createConnection = (password: string | undefined = undefined): Connection => {
    const { protocol, hostname, port } = new URL(device.uri);

    if (protocol !== 'http:') {
        throw new Error('Tests are currently not written to support anything else than HTTP');
    }

    const connection = new Connection(Protocol.Http, hostname, Number.parseInt(port), device.username, password ?? device.password);
    return connection;
};
