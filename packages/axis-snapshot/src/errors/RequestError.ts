/**
 * Error thrown when a request fail.
 */
export class RequestError extends Error {
    /**
     * Initializes a new instance of the class.
     * @param message The error message.
     * @param code The error code, like `ECONNREFUSED`.
     * @param error The error.
     */
    constructor(
        /**
         * Gets the error message.
         */
        message: string | undefined,
        /**
         * Gets the error code, like `ECONNREFUSED`.
         */
        readonly code: string | undefined,
        /**
         * Gets the error.
         */
        readonly error: unknown
    ) {
        super(message);
    }
}
