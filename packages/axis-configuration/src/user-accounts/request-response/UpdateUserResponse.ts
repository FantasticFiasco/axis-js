import { UnknownError } from '../..';
import { Response } from '../../shared/Response';

export class UpdateUserResponse extends Response {
    private static readonly SuccessResponse = /Modified account .*\./;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess() {
        const body = this.html('body').html();

        if (body === null) {
            throw new UnknownError('No HTML in response body');
        }

        this.handleUnknownError(body);
    }

    private handleUnknownError(body: string) {
        if (!UpdateUserResponse.SuccessResponse.test(body)) {
            throw new UnknownError(body);
        }
    }
}
