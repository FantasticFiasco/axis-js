import { DeviceResponse, UnknownError } from 'axis-core';

export class RemoveUserResponse extends DeviceResponse {
    constructor(response: string) {
        super(response);
    }

    private static readonly SuccessResponse = /Removed account .*\./;

    public assertSuccess(): void {
        const body: string | null = this.body;

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
