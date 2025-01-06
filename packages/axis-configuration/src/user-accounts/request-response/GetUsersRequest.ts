import { Connection, DeviceRequest } from 'axis-core';
import { GetUsersResponse } from './GetUsersResponse';

export class GetUsersRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(): Promise<GetUsersResponse> {
        const res = await this._get(this.relativePath);

        return new GetUsersResponse(res);
    }

    public get relativePath(): string {
        return '/axis-cgi/pwdgrp.cgi?action=get';
    }
}
