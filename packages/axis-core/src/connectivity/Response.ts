import * as cheerio from 'cheerio';

/**
 * Abstract class describing a HTTP response.
 */
export abstract class Response {
    private internalHtml?: cheerio.Root;

    protected constructor(protected readonly response: string) {}

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
