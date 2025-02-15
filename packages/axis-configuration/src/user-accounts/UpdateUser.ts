import { Connection, DeviceRequest } from 'axis-core';
import * as cheerio from 'cheerio';
import { User } from '..';
import { Converter } from './Converter';

export class UpdateUserRequest extends DeviceRequest {
    constructor(connection: Connection, user: User) {
        const relativePath = `/axis-cgi/pwdgrp.cgi?action=update&user=${user.name}&pwd=${user.password}&grp=users&sgrp=${Converter.toUserGroups(user.accessRights, user.ptz)}`;
        super(connection, relativePath);
    }
}

export const handleUpdateUser = async (res: Response): Promise<void> => {
    if (!res.ok) {
        throw new Error(`Failed to handle update user response: ${res.status} ${res.statusText}`);
    }

    // text/plain;charset=UTF-8
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'text/html') {
        throw new Error(`Failed to handle update user response, invalid content type: ${contentType}`);
    }

    const text = await res.text();
    const document = cheerio.load(text);
    const body = document.html('body');

    if (!body) {
        throw new Error('Failed to handle update user response, no HTML in response body');
    }

    if (!SUCCESS_RESPONSE.test(body)) {
        throw new Error(body);
    }
};

const SUCCESS_RESPONSE = /Modified account .*\./;
