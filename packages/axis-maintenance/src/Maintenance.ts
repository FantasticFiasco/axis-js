import { FactoryDefaultType } from './factory-default';
import { FactoryDefaultRequest } from './factory-default/FactoryDefaultRequest';
import { RestartRequest } from './restart/RestartRequest';
import { Connection } from './shared';

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
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async restart(): Promise<void> {
        const request = new RestartRequest(this.connection);
        const response = await request.send();

        response.assertSuccess();
    }

    /**
     * Resets the Axis device to factory default.
     *
     * The returned promise is resolved when the device accepts the factory default request, before
     * disconnecting from the network.
     * @param type The type of factory default.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async factoryDefault(type: FactoryDefaultType): Promise<void> {
        const request = new FactoryDefaultRequest(this.connection, type);
        const response = await request.send();

        response.assertSuccess();
    }
}
