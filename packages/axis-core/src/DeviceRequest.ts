import { get } from './client';
import { Connection } from './Connection';

/**
 * Abstract class describing a HTTP request.
 */
export abstract class DeviceRequest {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection description to the device.
     */
    protected constructor(
        /**
         * Gets the connection description to the device.
         */
        protected readonly connection: Connection
    ) {}

    /**
     * Sends a HTTP GET request to a device.
     * @param relativePath The relative path.
     */
    protected async get(relativePath: string): Promise<Response> {
        const res = await get(this.connection, relativePath);
        return res;
    }
}
