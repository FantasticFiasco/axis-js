import * as got from 'got';
import { get } from './client';
import { Connection } from './Connection';
import { RequestError, UnauthorizedError } from './errors';

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
    protected async get(relativePath: string): Promise<Buffer> {
        try {
            const res = await get(this.connection, relativePath);
            return res.body;
        } catch (error) {
            if (error instanceof got.HTTPError && error.response.statusCode === 401) {
                throw new UnauthorizedError();
            }
            if (error instanceof got.RequestError) {
                throw new RequestError(error, error.message, error.code);
            }

            // Fallback
            throw error;
        }
    }
}
