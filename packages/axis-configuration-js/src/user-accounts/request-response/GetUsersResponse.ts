import * as _ from 'lodash';
import { AccessRights, User } from './../..';
import { Response } from './../../shared/Response';

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
        if (!this.parsedUsers) {
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
        const ptz = parameters['ptz'];

        return [
            ...this.createUsers(administrators, AccessRights.Administrator, ptz),
            ...this.createUsers(_.difference(operators, administrators), AccessRights.Operator, ptz),
            ...this.createUsers(_.difference(viewers, [...administrators, ...operators]), AccessRights.Viewer, ptz),
        ];
    }

    private parseParameters(): { [name: string]: string[] } {
        // Each line represents a parameter
        const parameters = this.response.split('\n');

        return _.reduce(
            parameters,
            (result: { [name: string]: string[] }, parameter: string) => {
                const match = GetUsersResponse.ParameterSuccessResponse.exec(parameter);
                if (match) {
                    const name = match[1];
                    const values = match[2].split(',');

                    result[name] = _.filter(values, (value) => value.length > 0);
                }

                return result;
            },
            {}
        );
    }

    private createUsers(names: string[], accessRights: AccessRights, usersWithPtz: string[]): User[] {
        return _.map(names, (name) => {
            return new User(name, undefined, accessRights, _.includes(usersWithPtz, name));
        });
    }
}
