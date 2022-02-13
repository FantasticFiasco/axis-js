/**
 * Error thrown when cause is unknown.
 */
export class UnknownError extends Error {
    constructor(
        /**
         * The error message.
         */
        message: string
    ) {
        super(message);
    }
}
