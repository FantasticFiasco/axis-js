import { DeviceResponse, UnknownError } from 'axis-core';

export class UpdateUserResponse extends DeviceResponse {
    private static readonly SuccessResponse = /Modified account .*\./;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess(): void {
        const body = this.body;

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
