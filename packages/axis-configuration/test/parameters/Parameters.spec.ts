import { ExpectationError } from '@fantasticfiasco/expect';
import * as nock from 'nock';
import { Connection, Parameters, Protocol, RequestError, UnauthorizationError, UpdateParametersError } from '../../src';

describe('parameters', () => {
    const connection = new Connection(Protocol.Http, '1.2.3.4', 80, 'root', 'pass');
    const parameters = new Parameters(connection);

    afterEach(() => {
        nock.cleanAll();
    });

    describe('#get', () => {
        test('should get single parameter', async () => {
            // Arrange
            const name = 'Network.Bonjour.FriendlyName';
            const value = 'Main Entrance';

            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .reply(200, `root.${name}=${value}`);

            // Act
            const got = await parameters.get(name);

            // Assert
            expect(got[name]).toBe(value);
        });

        test('should get multiple parameters', async () => {
            // Arrange
            const name1 = 'Network.Bonjour.FriendlyName';
            const value1 = 'Main Entrance';
            const name2 = 'Network.Bonjour.Enabled';
            const value2 = 'yes';

            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .reply(200, `root.${name1}=${value1}\r\nroot.${name2}=${value2}`);

            // Act
            const got = await parameters.get(name1, name2);

            // Assert
            expect(got[name1]).toBe(value1);
            expect(got[name2]).toBe(value2);
        });

        test('should trim single parameter', async () => {
            // Arrange
            const name = 'Network.Bonjour.FriendlyName';
            const value = 'Main Entrance';

            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .reply(200, ` root.${name} = ${value} `);

            // Act
            const got = await parameters.get(name);

            // Assert
            expect(got[name]).toBe(value);
        });

        test('should trim multiple parameters', async () => {
            // Arrange
            const name1 = 'Network.Bonjour.FriendlyName';
            const value1 = 'Main Entrance';
            const name2 = 'Network.Bonjour.Enabled';
            const value2 = 'yes';

            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .reply(200, ` root.${name1} = ${value1} \r\n root.${name2} = ${value2} `);

            // Act
            const got = await parameters.get(name1, name2);

            // Assert
            expect(got[name1]).toBe(value1);
            expect(got[name2]).toBe(value2);
        });

        test('should not get single unknown parameter', async () => {
            // Arrange
            const name = 'Unknown.Parameter';

            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .reply(200, `# Error: Error -1 getting param in group '${name}'\r\n`);

            // Act
            const got = await parameters.get(name);

            // Assert
            expect(got[name]).toBeFalsy();
        });

        test('should not get multiple unknown parameters', async () => {
            // Arrange
            const name1 = 'Unknown.Parameter1';
            const name2 = 'Unknown.Parameter2';

            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .reply(200, `# Error: Error -1 getting param in group '${name1}'\r\n# Error: Error -1 getting param in group '${name2}'\r\n`);

            // Act
            const got = await parameters.get(name1, name2);

            // Assert
            expect(got[name1]).toBeFalsy();
            expect(got[name2]).toBeFalsy();
        });

        test('should get a mixture of known and unknown parameters', async () => {
            // Arrange
            const name1 = 'Network.Bonjour.FriendlyName';
            const value1 = 'Main Entrance';
            const name2 = 'Unknown.Parameter';

            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .reply(200, `root.${name1}=${value1}\r\n# Error: Error -1 getting param in group '${name2}'\r\n`);

            // Act
            const got = await parameters.get(name1, name2);

            // Assert
            expect(got[name1]).toBe(value1);
            expect(got[name2]).toBeFalsy();
        });

        test('should throw exception if no parameter is specified', async () => {
            try {
                // Act
                await parameters.get();
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(ExpectationError);
            }
        });

        test('should throw exception if device is unresponsive', async () => {
            // Arrange
            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

            try {
                // Act
                await parameters.get('Network.Bonjour.FriendlyName');
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(RequestError);
            }
        });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            nock(connection.url)
                .get(/param.cgi\?action=list/)
                .reply(401);

            try {
                // Act
                await parameters.get('Network.Bonjour.FriendlyName');
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UnauthorizationError);
            }
        });
    });

    describe('#update', () => {
        test('should update single parameter', async () => {
            // Arrange
            const scope = nock(connection.url)
                .get(/param.cgi\?action=update/)
                .reply(200, 'OK');

            // Act
            await parameters.update({ 'Network.Bonjour.FriendlyName': 'Main Entrance' });

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should update multiple parameters', async () => {
            // Arrange
            const scope = nock(connection.url)
                .get(/param.cgi\?action=update/)
                .reply(200, 'OK');

            // Act
            await parameters.update({
                'Network.Bonjour.FriendlyName': 'Main Entrance',
                'Network.Bonjour.Enabled': 'yes',
            });

            // Assert
            expect(scope.isDone()).toBe(true);
        });

        test('should not update single unknown parameter', async () => {
            // Arrange
            const name = 'Unknown.Parameter';
            const value = 'Value';

            nock(connection.url)
                .get(/param.cgi\?action=update/)
                .reply(200, `# Error: Error setting '${name}' to '${value}'!\r\n`);

            try {
                // Act
                await parameters.update({ [name]: value });
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UpdateParametersError);
                expect(error.parameterNames).toEqual([name]);
            }
        });

        test('should not update multiple unknown parameters', async () => {
            // Arrange
            const name1 = 'Unknown.Parameter1';
            const value1 = 'Value1';
            const name2 = 'Unknown.Parameter2';
            const value2 = 'Value2';

            nock(connection.url)
                .get(/param.cgi\?action=update/)
                .reply(200, `# Error: Error setting '${name1}' to '${value1}'!\r\n# Error: Error setting '${name2}' to '${value2}'!\r\n`);

            try {
                // Act
                await parameters.update({ [name1]: value1, [name2]: value2 });
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UpdateParametersError);
                expect(error.parameterNames).toEqual([name1, name2]);
            }
        });

        test('should update a mixture of known and unknown parameters', async () => {
            // Arrange
            const name = 'Unknown.Parameter';
            const value = 'Value';

            nock(connection.url)
                .get(/param.cgi\?action=update/)
                .reply(200, `# Error: Error setting '${name}' to '${value}'!\r\n`);

            try {
                // Act
                await parameters.update({ 'Network.Bonjour.FriendlyName': 'Main Entrance', name: value });
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UpdateParametersError);
                expect(error.parameterNames).toEqual([name]);
            }
        });

        test('should throw exception if no parameters are specified', async () => {
            try {
                // Act
                await parameters.update({});
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(ExpectationError);
            }
        });

        test('should throw exception if device is unresponsive', async () => {
            // Arrange
            nock(connection.url)
                .get(/param.cgi\?action=update/)
                .replyWithError(`Error: connect ETIMEDOUT ${connection.address}:${connection.port}`);

            try {
                // Act
                await parameters.update({ 'Network.Bonjour.FriendlyName': 'Main Entrance' });
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(RequestError);
            }
        });

        test('should throw exception if user is unauthorized', async () => {
            // Arrange
            nock(connection.url)
                .get(/param.cgi\?action=update/)
                .reply(401);

            try {
                // Act
                await parameters.update({ 'Network.Bonjour.FriendlyName': 'Main Entrance' });
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UnauthorizationError);
            }
        });
    });
});
