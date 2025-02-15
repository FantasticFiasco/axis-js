import { Connection, fetchBuilder } from 'axis-core';
import { FactoryDefaultRequest, handleFactoryDefault } from './FactoryDefault';
import { FactoryDefaultType } from './FactoryDefaultType';
import { handleRestart, RestartRequest } from './Restart';

const fetch = fetchBuilder(global.fetch);

/**
 * Class responsible for running maintenance operations on devices from Axis Communication.
 */
export class Maintenance {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * Restarts the Axis device.
     *
     * The returned promise is resolved when the device accepts the restart request, before
     * disconnecting from the network.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    public async restart(init?: RequestInit): Promise<void> {
        const req = new RestartRequest(this.connection);
        const res = await fetch(req, init);

        await handleRestart(res);
    }

    /**
     * Resets the Axis device to factory default.
     *
     * The returned promise is resolved when the device accepts the factory default request, before
     * disconnecting from the network.
     * @param type The type of factory default.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    public async factoryDefault(type: FactoryDefaultType, init?: RequestInit): Promise<void> {
        const req = new FactoryDefaultRequest(this.connection, type);
        const res = await fetch(req, init);

        await handleFactoryDefault(res, type);
    }
}
