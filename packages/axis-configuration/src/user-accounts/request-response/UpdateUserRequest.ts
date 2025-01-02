import { Connection, DeviceRequest, Fetch } from 'axis-core';
import { User } from '../..';
import { Converter } from './Converter';
import { UpdateUserResponse } from './UpdateUserResponse';

export class UpdateUserRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly user: User,
        f: Fetch = fetch,
    ) {
        super(connection, f);
    }

    public async send(): Promise<UpdateUserResponse> {
        const response = await this._get(this.relativePath);

        return new UpdateUserResponse(response.toString());
    }

    public get relativePath(): string {
        return `/axis-cgi/pwdgrp.cgi?action=update&user=${this.user.name}&pwd=${this.user.password}&grp=users&sgrp=${Converter.toUserGroups(
            this.user.accessRights,
            this.user.ptz,
        )}`;
    }
}
