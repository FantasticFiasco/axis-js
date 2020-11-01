import { Connection } from '../..';
import { Request } from '../../shared/Request';
import { GetUsersResponse } from './GetUsersResponse';

export class GetUsersRequest extends Request {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(): Promise<GetUsersResponse> {
        const response = await this.get(this.url);

        return new GetUsersResponse(response);
    }

    public get url(): string {
        return `${this.connection.url}/axis-cgi/pwdgrp.cgi?action=get`;
    }
}
