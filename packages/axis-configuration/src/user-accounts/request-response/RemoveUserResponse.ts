import { DeviceResponse, UnknownError } from 'axis-core';

export class RemoveUserResponse extends DeviceResponse {
    private static readonly SuccessResponse = /Removed account .*\./;

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
        if (!RemoveUserResponse.SuccessResponse.test(body)) {
            throw new UnknownError(body);
        }
    }
}
