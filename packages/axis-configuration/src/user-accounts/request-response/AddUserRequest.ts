import { Connection, DeviceRequest } from 'axis-core';
import { User } from '../..';
import { AddUserResponse } from './AddUserResponse';
import { Converter } from './Converter';

export class AddUserRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly user: User,
    ) {
        super(connection);
    }

    public async send(): Promise<AddUserResponse> {
        const response = await this._get(this.relativePath);

        return new AddUserResponse(response.toString());
    }

    public get relativePath(): string {
        return `/axis-cgi/pwdgrp.cgi?action=add&user=${this.user.name}&pwd=${this.user.password}&grp=users&sgrp=${Converter.toUserGroups(
            this.user.accessRights,
            this.user.ptz,
        )}&comment=${this.user.name}`;
    }
}
