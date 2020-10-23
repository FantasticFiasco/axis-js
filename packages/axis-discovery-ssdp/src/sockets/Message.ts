/**
 * Class describing a received SSDP message.
 */
export class Message {
    private readonly headers: { [name: string]: string } = {};

    constructor(readonly remoteAddress: string, message: Buffer) {
        this.parseHeaders(message);
    }

    /**
     * Gets the HTTP method.
     */
    get method(): string {
        return this.headers['method'];
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

    private parseHeaders(message: Buffer) {
        const headers = message.toString().trim().split('\r\n');

        const method = headers.shift();
        if (method === undefined) {
            throw new Error('SSDP message is not specifying the method.');
        }

        this.headers['method'] = method;

        for (const header of headers) {
            const indexOfValueSeparator = header.indexOf(':');
            const name = header.slice(0, indexOfValueSeparator).trim();
            const value = header.slice(indexOfValueSeparator + 1, header.length).trim();

            this.headers[name] = value;
        }
    }

    private getHeaderValue(headerName: string): string {
        const headerValue = this.headers[headerName];

        if (!headerValue) {
            throw new Error(`Header with name ${headerName} does not exist.`);
        }

        return headerValue;
    }
}
