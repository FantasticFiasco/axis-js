/**
 * Error thrown when a request fail.
 */
export class RequestError extends Error {
    /**
     * Initializes a new instance of the class.
     * @param error The error.
     * @param message The error message.
     * @param code The error code, like `ECONNREFUSED`.
     */
    constructor(
        /**
         * Gets the error.
         */
        readonly error: unknown,
        /**
         * Gets the error message.
         */
        message?: string,
        /**
         * Gets the error code, like `ECONNREFUSED`.
         */
        readonly code?: string,
    ) {
        super(message);
    }
}
