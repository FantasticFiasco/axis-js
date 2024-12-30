import { DeviceResponse, UnknownError } from 'axis-core';
import { UserAlreadyExistsError } from '../..';

export class AddUserResponse extends DeviceResponse {
    constructor(response: string) {
        super(response);
    }

    private static readonly SuccessResponse = /Created account .*\./;
    private static readonly UserAlreadyExistsResponse = /Error: this user name already exists, consult the system log file/;

    public assertSuccess(): void {
        const body: string | null = this.body;

        if (body === null) {
            throw new UnknownError('No HTML in response body');
        }

        this.handleUserAlreadyExistsError(body);
        this.handleUnknownError(body);
    }

    private handleUserAlreadyExistsError(body: string) {
        if (AddUserResponse.UserAlreadyExistsResponse.test(body)) {
            throw new UserAlreadyExistsError();
        }
    }

    private handleUnknownError(body: string) {
        if (!AddUserResponse.SuccessResponse.test(body)) {
            throw new UnknownError(body);
        }
    }
}
