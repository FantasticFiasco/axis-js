import * as cheerio from 'cheerio';

/**
 * Abstract class describing a HTTP response.
 */
export abstract class DeviceResponse {
    private internalHtml?: cheerio.Root;

    /**
     * Initializes a new instance of the class.
     * @param response The HTTP response.
     */
    protected constructor(
        /**
         * Gets the HTTP response.
         */
        protected readonly response: string
    ) {}

    /**
     * Returns void given valid response, otherwise throws an error.
     */
    public abstract assertSuccess(): void;

    /**
     * Returns the body of the HTML response.
     */
    protected get body(): string {
        if (!this.internalHtml) {
            this.internalHtml = cheerio.load(this.response);
        }

        return this.internalHtml.html('body');
    }
}
