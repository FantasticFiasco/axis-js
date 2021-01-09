import { AccessRights, User } from '../..';
import { Response } from '../../shared/Response';

export class GetUsersResponse extends Response {
    // A parameter has the following format:
    // [NAME]="[VALUE1],[VALUE2]..."
    private static readonly ParameterSuccessResponse = /\s*(\S*)\s*=\s*"(\S*)"\s*/;

    private parsedUsers?: User[];

    constructor(response: string) {
        super(response);
    }

    public assertSuccess() {
        // No errors are reported in the response body, thus no action is needed here
    }

    public get users(): User[] {
        if (this.parsedUsers === undefined) {
            this.parsedUsers = this.parse();
        }

        return this.parsedUsers;
    }

    private parse(): User[] {
        const parameters = this.parseParameters();

        const administrators = parameters['admin'];
        const operators = parameters['operator'];
        const viewers = parameters['viewer'];

        // Users with PTZ control
        const usersWithPtz = parameters['ptz'];

        const users: User[] = [];

        for (const userName of parameters['digusers']) {
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

    private parseParameters(): { [name: string]: string[] } {
        // Each line represents a parameter
        const parameters = this.response.split('\n');

        return parameters.reduce<{ [name: string]: string[] }>((result, parameter) => {
            const match = GetUsersResponse.ParameterSuccessResponse.exec(parameter);
            if (match) {
                const name = match[1];
                const values = match[2].split(',');

                result[name] = values.filter((value) => value.length > 0);
            }

            return result;
        }, {});
    }
}
