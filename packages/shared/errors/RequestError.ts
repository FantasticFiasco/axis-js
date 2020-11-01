import * as http from 'http';

/**
 * Error thrown when a request fail.
 */
export class RequestError extends Error {
    constructor(
        /**
         * The error message.
         */
        message: string | undefined,
        /**
         * The HTTP status code.
         */
        readonly statusCode: number | undefined,
        /**
         * The cause of the error.
         */
        readonly cause: any | undefined,
        /**
         * The error.
         */
        readonly error: any,
        /**
         * The response.
         */
        readonly response: http.IncomingMessage
    ) {
        super(message);
    }
}
