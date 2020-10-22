import { Connection } from './../..';
import { Request } from './../../shared/Request';
import { RemoveUserResponse } from './RemoveUserResponse';

export class RemoveUserRequest extends Request {
    constructor(connection: Connection, private readonly username: string) {
        super(connection);
    }

    public async send(): Promise<RemoveUserResponse> {
        const response = await this.get(this.url);

        return new RemoveUserResponse(response);
    }

    public get url(): string {
        return `${this.connection.url}/axis-cgi/pwdgrp.cgi?action=remove&user=${this.username}`;
    }
}
