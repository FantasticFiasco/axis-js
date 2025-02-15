import { Connection, DeviceRequest } from 'axis-core';
import * as cheerio from 'cheerio';

export class RemoveUserRequest extends DeviceRequest {
    constructor(connection: Connection, username: string) {
        super(connection, `/axis-cgi/pwdgrp.cgi?action=remove&user=${username}`);
    }
}

export const handleRemoveUser = async (res: Response): Promise<void> => {
    if (!res.ok) {
        throw new Error(`Failed to handle remove user response: ${res.status} ${res.statusText}`);
    }

    // text/plain;charset=UTF-8
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'text/html') {
        throw new Error(`Failed to handle remove user response, invalid content type: ${contentType}`);
    }

    const text = await res.text();
    const document = cheerio.load(text);
    const body = document.html('body');

    if (!body) {
        throw new Error('Failed to handle remove user response, no HTML in response body');
    }

    if (!SUCCESS_RESPONSE.test(body)) {
        throw new Error(body);
    }
};

const SUCCESS_RESPONSE = /Removed account .*\./;
