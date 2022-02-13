import * as got from 'got';
import { get } from '../auth';
import { Connection } from './Connection';
import { RequestError, UnauthorizedError } from './errors';

/**
 * Abstract class describing a HTTP request.
 */
export abstract class Request {
    protected constructor(protected readonly connection: Connection) {}

    /**
     * Sends a HTTP GET request to a device.
     */
    protected async get(url: string): Promise<Buffer> {
        try {
            const res = await get(url, this.connection.username, this.connection.password, this.connection.options?.agent);
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
