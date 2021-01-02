import { Connection, RequestError, UnauthorizationError } from './';

export abstract class Request {
    protected constructor(protected readonly connection: Connection) {}

    protected async get(url: string): Promise<string> {
        const options: rp.RequestPromiseOptions = {
            auth: {
                user: this.connection.username,
                pass: this.connection.password,
                sendImmediately: false,
            },
            agent: this.connection.options?.agent,
        };

        try {
            return await rp.get(url, options);
        } catch (error) {
            this.handleStatusCodeError(error);
            this.handleRequestError(error);

            // Fallback
            throw error;
        }
    }

    private handleStatusCodeError(error: Error) {
        if (error instanceof errors.StatusCodeError) {
            if (error.statusCode === 401) {
                throw new UnauthorizationError();
            }

            throw new RequestError(error.message, error.statusCode, undefined, error.error, error.response);
        }
    }

    private handleRequestError(error: errors.RequestError) {
        if (error instanceof errors.RequestError) {
            throw new RequestError(error.message, undefined, error.cause, error.error, error.response);
        }
    }
}
