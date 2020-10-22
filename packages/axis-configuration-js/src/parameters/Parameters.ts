import * as expect from '@fantasticfiasco/expect';
import { Connection } from './..';
import { GetParametersRequest } from './request-response/GetParametersRequest';
import { UpdateParametersRequest } from './request-response/UpdateParametersRequest';

/**
 * Class responsible getting and setting non-dynamic parameter values. Non-dynamic parameters are
 * pre-configured and already exist in your Axis product. A non-dynamic parameter has one or more
 * values. Some non-dynamic parameters are configurable and some are read only.
 */
export class Parameters {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * Gets parameters and their current values.
     * @param parameterGroups A sequence of parameters named '{group}.{name}'. If {name} is
     * omitted, all the parameters of the {group} are returned. Wildcard (*) can be used filter
     * parameters. E.g. 'Network.*.FriendlyName' will return the two parameters
     * 'Network.Bonjour.FriendlyName' and 'Network.SSDP.FriendlyName'.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    public async get(...parameterGroups: string[]): Promise<{ [name: string]: string }> {
        expect.toBeTrue(parameterGroups.length > 0, 'At least one parameter group must be specied');

        const request = new GetParametersRequest(this.connection, ...parameterGroups);
        const response = await request.send();

        response.assertSuccess();

        return response.parameters;
    }

    /**
     * Updates parameters with new values.
     * @param parameters An object with parameters named '{group}.{name}' and their corresponding
     * new value.
     * @throws {UpdateParametersError} Updating one or many of the parameters failed.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    public async update(parameters: { [name: string]: string }): Promise<void> {
        expect.toBeTrue(Object.keys(parameters).length > 0, 'At least one parameter must be specified');

        const request = new UpdateParametersRequest(this.connection, parameters);
        const response = await request.send();

        response.assertSuccess();
    }
}
