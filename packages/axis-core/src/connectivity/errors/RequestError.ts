/**
 * Error thrown when a request fail.
 */
export class RequestError extends Error {
    /**
     * Initializes a new instance of the class.
     * @param error
     * @param message
     * @param code
     */
    constructor(
        /**
         * The error.
         */
        readonly error: unknown,
        /**
         * The error message.
         */
        message?: string,
        /**
         * The error code, like `ECONNREFUSED`.
         */
        readonly code?: string
    ) {
        super(message);
    }
}
