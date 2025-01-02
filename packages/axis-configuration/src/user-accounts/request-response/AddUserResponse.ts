import { DeviceResponse } from 'axis-core';
import { UserAlreadyExistsError } from '../..';

export class AddUserResponse extends DeviceResponse {
    constructor(response: string) {
        super(response);
    }

    private static readonly SuccessResponse = /Created account .*\./;
    private static readonly UserAlreadyExistsResponse = /Error: this user name already exists, consult the system log file/;

    public assertSuccess(): void {
        const body: string | null = this._body;

        if (body === null) {
            throw new Error('No HTML in response body');
        }

        if (AddUserResponse.UserAlreadyExistsResponse.test(body)) {
            throw new UserAlreadyExistsError();
        }

        if (!AddUserResponse.SuccessResponse.test(body)) {
            throw new Error(body);
        }
    }
}
