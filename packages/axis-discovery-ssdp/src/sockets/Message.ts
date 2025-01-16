/**
 * Class describing a received SSDP message.
 */
export class Message {
    constructor(
        readonly remoteAddress: string,
        message: Buffer,
    ) {
        this.headers = this.parseHeaders(message);
    }

    private readonly headers: Map<string, string>;

    /**
     * Gets the HTTP method.
     */
    get method(): string {
        const method = this.headers.get('method');

        if (!method) {
            throw new Error('Method is not specified.');
        }

        return method;
    }

    /**
     * Gets the URL to the UPnP description of the root device.
     */
    get location(): string {
        return this.getHeaderValue('LOCATION');
    }

    /**
     * Gets the Unique Service Name (USN) header.
     */
    get usn(): string {
        return this.getHeaderValue('USN');
    }

    /**
     * Gets the Notification Type (NT) header.
     */
    get nt(): string {
        return this.getHeaderValue('NT');
    }

    /**
     * Gets the Notification Sub Type (NTS).
     */
    get nts(): string {
        return this.getHeaderValue('NTS');
    }

    private parseHeaders(message: Buffer): Map<string, string> {
        const headers = new Map<string, string>();

        const lines = message.toString().trim().split('\r\n');

        const method = lines.shift();
        if (method === undefined) {
            throw new Error('SSDP message is not specifying the method.');
        }

        headers.set('method', method);

        for (const line of lines) {
            const indexOfValueSeparator = line.indexOf(':');
            const name = line.slice(0, indexOfValueSeparator).trim();
            const value = line.slice(indexOfValueSeparator + 1).trim();

            headers.set(name, value);
        }

        return headers;
    }

    private getHeaderValue(headerName: string): string {
        const headerValue = this.headers.get(headerName);

        if (!headerValue) {
            throw new Error(`Header with name ${headerName} does not exist.`);
        }

        return headerValue;
    }
}
