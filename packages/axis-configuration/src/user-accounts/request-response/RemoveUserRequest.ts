import { Connection, DeviceRequest } from 'axis-core';
import { RemoveUserResponse } from './RemoveUserResponse';

export class RemoveUserRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly username: string,
    ) {
        super(connection);
    }

    public async send(): Promise<RemoveUserResponse> {
        const response = await this._get(this.relativePath);

        return new RemoveUserResponse(response.toString());
    }

    public get relativePath(): string {
        return `/axis-cgi/pwdgrp.cgi?action=remove&user=${this.username}`;
    }
}
