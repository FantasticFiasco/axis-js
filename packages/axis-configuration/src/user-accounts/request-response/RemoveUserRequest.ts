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
        const response = await this.get(this.relativePath());

        return new RemoveUserResponse(response.toString());
    }

    public relativePath(): string {
        return `/axis-cgi/pwdgrp.cgi?action=remove&user=${this.username}`;
    }
}
