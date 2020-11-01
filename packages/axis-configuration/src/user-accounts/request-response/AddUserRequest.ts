import { Connection, User } from '../..';
import { Request } from '../../shared/Request';
import { AddUserResponse } from './AddUserResponse';
import { Converter } from './Converter';

export class AddUserRequest extends Request {
    constructor(connection: Connection, private readonly user: User) {
        super(connection);
    }

    public async send(): Promise<AddUserResponse> {
        const response = await this.get(this.url);

        return new AddUserResponse(response);
    }

    public get url(): string {
        return `${this.connection.url}/axis-cgi/pwdgrp.cgi?action=add&user=${this.user.name}&pwd=${this.user.password}&grp=users&sgrp=${Converter.toUserGroups(
            this.user.accessRights,
            this.user.ptz
        )}&comment=${this.user.name}`;
    }
}
