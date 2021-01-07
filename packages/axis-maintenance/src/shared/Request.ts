import * as got from 'got';
import { Connection, RequestError, UnauthorizedError } from '..';
import { get } from '../auth';

export abstract class Request {
    protected constructor(protected readonly connection: Connection) {}

    protected async get(url: string): Promise<string> {
        try {
            const res = await get(url, this.connection.username, this.connection.password, this.connection.options?.agent);
            return res.body;
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
