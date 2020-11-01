import { UnknownError, UserAlreadyExistsError } from '../..';
import { Response } from '../../shared/Response';

export class AddUserResponse extends Response {
    private static readonly SuccessResponse = /Created account .*\./;
    private static readonly UserAlreadyExistsResponse = /Error: this user name already exists, consult the system log file/;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess() {
        const body: string | null = this.html('body').html();

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
