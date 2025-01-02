import { Connection, DeviceRequest, Fetch } from 'axis-core';
import { GetUsersResponse } from './GetUsersResponse';

export class GetUsersRequest extends DeviceRequest {
    constructor(connection: Connection, f: Fetch = fetch) {
        super(connection, f);
    }

    public async send(): Promise<GetUsersResponse> {
        const response = await this._get(this.relativePath);

        return new GetUsersResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/pwdgrp.cgi?action=get';
    }
}
