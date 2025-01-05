/**
 * Abstract class describing a HTTP response.
 */
export abstract class DeviceResponse {
    /**
     * Initializes a new instance of the class.
     * @param response The HTTP response.
     */
    protected constructor(response: Response) {
        this._response = response;
    }

    /**
     * Gets the HTTP response.
     */
    protected readonly _response: Response;

    /**
     * Returns resolved promise given valid response, otherwise a rejected promise.
     */
    public abstract assertSuccess(): Promise<void>;
}
