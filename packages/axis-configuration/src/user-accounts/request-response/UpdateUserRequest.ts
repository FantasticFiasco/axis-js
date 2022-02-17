import { Connection, DeviceRequest } from 'axis-core';
import { User } from '../..';
import { Converter } from './Converter';
import { UpdateUserResponse } from './UpdateUserResponse';

export class UpdateUserRequest extends DeviceRequest {
    constructor(connection: Connection, private readonly user: User) {
        super(connection);
    }

    public async send(): Promise<UpdateUserResponse> {
        const response = await this.get(this.url);

        return new UpdateUserResponse(response.toString());
    }

    public get url(): string {
        return `${this.connection.url}/axis-cgi/pwdgrp.cgi?action=update&user=${this.user.name}&pwd=${
            this.user.password
        }&grp=users&sgrp=${Converter.toUserGroups(this.user.accessRights, this.user.ptz)}`;
    }
}
