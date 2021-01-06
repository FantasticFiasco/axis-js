import * as got from 'got';
import { Connection } from '..';
import { get } from '../auth/http';
import { RequestError, UnauthorizedError } from '../errors';

export abstract class Request {
    protected constructor(protected readonly connection: Connection) {}

    protected async get(url: string): Promise<Buffer> {
        try {
            const res = await get(url, this.connection.username, this.connection.password, this.connection.options?.agent);
            return Buffer.from(res.body);
        } catch (error) {
            if (error instanceof got.HTTPError && error.response.statusCode === 401) {
                throw new UnauthorizedError();
            }
            if (error instanceof got.RequestError) {
                throw new RequestError(error.message, error.code, error);
            }

            // Fallback
            throw error;
        }
    }
}
