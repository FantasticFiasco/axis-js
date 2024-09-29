import { Connection, DeviceRequest } from 'axis-core';
import { GetUsersResponse } from './GetUsersResponse';

export class GetUsersRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(): Promise<GetUsersResponse> {
        const response = await this.get(this.relativePath());

        return new GetUsersResponse(response.toString());
    }

    public relativePath(): string {
        return '/axis-cgi/pwdgrp.cgi?action=get';
    }
}
