import { Connection, DeviceRequest } from 'axis-core';
import { AccessRights } from '../AccessRights';
import { User } from '../User';

export class GetUsersRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection, '/axis-cgi/pwdgrp.cgi?action=get');
    }
}

export const handleGetUsers = async (res: Response): Promise<User[]> => {
    if (!res.ok) {
        throw new Error(`Failed to handle get users response: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (contentType !== 'text/html') {
        throw new Error(`Failed to handle get users response, invalid content type: ${contentType}`);
    }

    const text = await res.text();
    const parameters = parseParameters(text);
    const users = parseUsers(parameters);

    return users;
};

// A parameter has the following format:
// [NAME]="[VALUE1],[VALUE2]..."
const PARAMETER_SUCCESS_RESPONSE = /\s*(\S*)\s*=\s*"(\S*)"\s*/;

const parseParameters = (text: string): Map<string, string[]> => {
    const parameters = new Map<string, string[]>();

    // Each line represents a parameter
    const lines = text.split('\n');

    for (const line of lines) {
        const match = PARAMETER_SUCCESS_RESPONSE.exec(line);
        if (match) {
            const name = match[1];
            const values = match[2].split(',').filter((value) => value.length > 0);

            parameters.set(name, values);
        }
    }

    return parameters;
};

const parseUsers = (parameters: Map<string, string[]>): User[] => {
    const administrators = parameters.get('admin') ?? [];
    const operators = parameters.get('operator') ?? [];
    const viewers = parameters.get('viewer') ?? [];

    // Users with PTZ control
    const usersWithPtz = parameters.get('ptz') ?? [];

    const users: User[] = [];

    for (const userName of parameters.get('digusers') ?? []) {
        let accessRights: AccessRights | undefined;

        if (administrators.includes(userName)) {
            accessRights = AccessRights.Administrator;
        } else if (operators.includes(userName)) {
            accessRights = AccessRights.Operator;
        } else if (viewers.includes(userName)) {
            accessRights = AccessRights.Viewer;
        } else {
            continue;
        }

        const ptz = usersWithPtz.includes(userName);

        users.push(new User(userName, undefined, accessRights, ptz));
    }

    return users;
};
