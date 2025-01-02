import { Connection, DeviceRequest, Fetch } from 'axis-core';
import { RestartResponse } from './RestartResponse';

export class RestartRequest extends DeviceRequest {
    constructor(connection: Connection, f: Fetch = fetch) {
        super(connection, f);
    }

    public async send(): Promise<RestartResponse> {
        const response = await this._get(this.relativePath);

        return new RestartResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/restart.cgi';
    }
}
