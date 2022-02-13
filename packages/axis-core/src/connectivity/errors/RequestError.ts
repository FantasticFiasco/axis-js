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
         * The error code, like `ECONNREFUSED`.
         */
        readonly code: string | undefined,
        /**
         * The error.
         */
        readonly error: unknown
    ) {
        super(message);
    }
}
