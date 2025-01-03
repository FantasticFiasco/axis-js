import { Connection, DeviceRequest } from 'axis-core';
import { RestartResponse } from './RestartResponse';

export class RestartRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(): Promise<RestartResponse> {
        const response = await this._get(this.relativePath);

        return new RestartResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/restart.cgi';
    }
}
