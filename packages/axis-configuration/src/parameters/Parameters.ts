import * as expect from '@fantasticfiasco/expect';
import { Connection, fetchBuilder } from 'axis-core';
import { GetParametersRequest, handleGetParameters } from './request-response/GetParameters';
import { handleUpdateParameters, UpdateParametersRequest } from './request-response/UpdateParameters';

const fetch = fetchBuilder(global.fetch);

/**
 * Class responsible getting and setting non-dynamic parameter values. Non-dynamic parameters are
 * pre-configured and already exist in your Axis product. A non-dynamic parameter has one or more
 * values. Some non-dynamic parameters are configurable and some are read only.
 */
export class Parameters {
    /**
     * Initializes a new instance of the class.
     * @param #connection The connection to the device.
     */
    constructor(connection: Connection) {
        this.#connection = connection;
    }

    readonly #connection: Connection;

    /**
     * Gets parameters and their current values.
     * @param parameterGroups A sequence of parameters named '{group}.{name}'. If {name} is
     * omitted, all the parameters of the {group} are returned. Wildcard (*) can be used filter
     * parameters. E.g. 'Network.*.FriendlyName' will return the two parameters
     * 'Network.Bonjour.FriendlyName' and 'Network.SSDP.FriendlyName'.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    public async get(parameterGroups: string[], init?: RequestInit): Promise<Map<string, string>> {
        expect.toBeTrue(parameterGroups.length > 0, 'At least one parameter group must be specified');

        const req = new GetParametersRequest(this.#connection, parameterGroups);
        const res = await fetch(req, init);

        const parameters = await handleGetParameters(res);
        return parameters;
    }

    /**
     * Updates parameters with new values.
     * @param parameters An object with parameters named '{group}.{name}' and their corresponding
     * new value.
     * @param init The object containing any custom settings that you want to apply to the request.
     * @throws {UpdateParametersError} Updating one or many of the parameters failed.
     */
    public async update(parameters: Map<string, string>, init?: RequestInit): Promise<void> {
        expect.toBeTrue(parameters.size > 0, 'At least one parameter must be specified');

        const req = new UpdateParametersRequest(this.#connection, parameters);
        const res = await fetch(req, init);

        await handleUpdateParameters(res);
    }
}
