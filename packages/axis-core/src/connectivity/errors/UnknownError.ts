/**
 * Error thrown when cause is unknown.
 */
export class UnknownError extends Error {
    /**
     * Initializes a new instance of the class.
     * @param message
     */
    constructor(
        /**
         * The error message.
         */
        message: string
    ) {
        super(message);
    }
}
