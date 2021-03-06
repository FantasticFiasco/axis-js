import { Connection } from '../Connection';
import { SnapshotOptions } from '../SnapshotOptions';
import { toQueryString } from './convert';
import { Request } from './Request';

export class JpegRequest extends Request {
    constructor(connection: Connection, private readonly options?: SnapshotOptions) {
        super(connection);
    }

    public async send(): Promise<Buffer> {
        const response = await this.get(this.url);

        return response;
    }

    public get url(): string {
        let url = `${this.connection.url}/axis-cgi/jpg/image.cgi`;

        const queryString = toQueryString(this.options);
        if (queryString !== null) {
            url += '?' + queryString;
        }

        return url;
    }
}
