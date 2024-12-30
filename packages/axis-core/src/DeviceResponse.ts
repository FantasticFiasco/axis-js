import * as cheerio from 'cheerio';

/**
 * Abstract class describing a HTTP response.
 */
export abstract class DeviceResponse {
    /**
     * Initializes a new instance of the class.
     * @param response The HTTP response.
     */
    protected constructor(response: string) {
        this._response = response;
    }

    private internalHtml?: cheerio.Root;

    /**
     * Gets the HTTP response.
     */
    protected readonly _response: string;

    /**
     * Returns void given valid response, otherwise throws an error.
     */
    public abstract assertSuccess(): void;

    /**
     * Returns the body of the HTML response.
     */
    protected get _body(): string | null {
        if (!this.internalHtml) {
            try {
                this.internalHtml = cheerio.load(this._response);
            } catch {
                return null;
            }
        }

        return this.internalHtml.html('body');
    }
}
