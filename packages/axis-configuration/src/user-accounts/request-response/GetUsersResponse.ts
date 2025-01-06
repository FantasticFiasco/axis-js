import { DeviceResponse } from 'axis-core';
import { AccessRights, User } from '../..';

export class GetUsersResponse extends DeviceResponse {
    constructor(response: Response) {
        super(response);
    }

    // A parameter has the following format:
    // [NAME]="[VALUE1],[VALUE2]..."
    private static readonly ParameterSuccessResponse = /\s*(\S*)\s*=\s*"(\S*)"\s*/;

    #parsedUsers?: User[];

    public async assertSuccess(): Promise<void> {
        if (!this._response.ok) {
            throw new Error(`Failed to get users: ${this._response.statusText}`);
        }
    }

    public async users(): Promise<User[]> {
        if (this.#parsedUsers === undefined) {
            this.#parsedUsers = await this.#parse();
        }

        return this.#parsedUsers;
    }

    async #parse(): Promise<User[]> {
        const parameters = await this.#parseParameters();

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
    }

    async #parseParameters(): Promise<Map<string, string[]>> {
        const parameters = new Map<string, string[]>();

        const text = await this._response.text();

        // Each line represents a parameter
        const lines = text.split('\n');

        for (const line of lines) {
            const match = GetUsersResponse.ParameterSuccessResponse.exec(line);
            if (match) {
                const name = match[1];
                const values = match[2].split(',').filter((value) => value.length > 0);

                parameters.set(name, values);
            }
        }

        return parameters;
    }
}
