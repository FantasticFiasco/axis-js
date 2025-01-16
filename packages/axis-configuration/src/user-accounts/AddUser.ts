import { Connection, DeviceRequest } from 'axis-core';
import * as cheerio from 'cheerio';
import { User, UserAlreadyExistsError } from '..';
import { Converter } from './Converter';

export class AddUserRequest extends DeviceRequest {
    constructor(connection: Connection, user: User, init?: RequestInit) {
        const relativePath = `/axis-cgi/pwdgrp.cgi?action=add&user=${user.name}&pwd=${user.password}&grp=users&sgrp=${Converter.toUserGroups(
            user.accessRights,
            user.ptz,
        )}&comment=${user.name}`;

        super(connection, relativePath, init);
    }
}

export const handleAddUser = async (res: Response): Promise<void> => {
    if (!res.ok) {
        throw new Error(`Failed to handle add user response: ${res.status} ${res.statusText}`);
    }

    // text/plain;charset=UTF-8
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'text/html') {
        throw new Error(`Failed to handle add user response, invalid content type: ${contentType}`);
    }

    const text = await res.text();
    const document = cheerio.load(text);
    const body = document.html('body');

    if (!body) {
        throw new Error('Failed to handle add user response, no HTML in response body');
    }

    if (USER_ALREADY_EXISTS_RESPONSE.test(body)) {
        throw new UserAlreadyExistsError();
    }

    if (!SUCCESS_RESPONSE.test(body)) {
        throw new Error(body);
    }
};

const SUCCESS_RESPONSE = /Created account .*\./;
const USER_ALREADY_EXISTS_RESPONSE = /Error: this user name already exists, consult the system log file/;
