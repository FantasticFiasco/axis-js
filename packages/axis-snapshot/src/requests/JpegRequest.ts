import { Connection, DeviceRequest, Fetch } from 'axis-core';
import { SnapshotOptions } from '../SnapshotOptions';
import { toQueryString } from './convert';

export class JpegRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly options?: SnapshotOptions,
        f: Fetch = fetch,
    ) {
        super(connection, f);
    }

    public async send(): Promise<Buffer> {
        const response = await this._get(this.relativePath);

        return response;
    }

    public get relativePath(): string {
        let url = '/axis-cgi/jpg/image.cgi';

        const queryString = toQueryString(this.options);
        if (queryString !== null) {
            url += '?' + queryString;
        }

        return url;
    }
}
