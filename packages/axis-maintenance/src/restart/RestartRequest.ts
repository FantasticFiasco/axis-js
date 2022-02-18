import { Connection, DeviceRequest } from 'axis-core';
import { RestartResponse } from './RestartResponse';

export class RestartRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(): Promise<RestartResponse> {
        const response = await this.get(this.url);

        return new RestartResponse(response.toString());
    }

    public get url(): string {
        return `${this.connection.url}/axis-cgi/restart.cgi`;
    }
}
