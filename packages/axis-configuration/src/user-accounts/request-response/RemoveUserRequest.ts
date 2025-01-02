import { Connection, DeviceRequest, Fetch } from 'axis-core';
import { RemoveUserResponse } from './RemoveUserResponse';

export class RemoveUserRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly username: string,
        f: Fetch = fetch,
    ) {
        super(connection, f);
    }

    public async send(): Promise<RemoveUserResponse> {
        const response = await this._get(this.relativePath);

        return new RemoveUserResponse(response.toString());
    }

    public get relativePath(): string {
        return `/axis-cgi/pwdgrp.cgi?action=remove&user=${this.username}`;
    }
}
