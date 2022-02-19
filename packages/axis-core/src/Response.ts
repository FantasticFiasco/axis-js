/**
 * Interface describing a response from a camera.
 */
export interface Response {
    /**
     * The HTTP status code.
     */
    statusCode: number;

    /**
     * The response headers.
     */
    headers: NodeJS.Dict<string | string[]>;

    /**
     * The response body.
     */
    body: Buffer;
}
