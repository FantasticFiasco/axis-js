import { DeviceResponse } from 'axis-core';

export class RemoveUserResponse extends DeviceResponse {
    constructor(response: string) {
        super(response);
    }

    private static readonly SuccessResponse = /Removed account .*\./;

    public assertSuccess(): void {
        const body: string | null = this._body;

        if (body === null) {
            throw new Error('No HTML in response body');
        }

        if (!RemoveUserResponse.SuccessResponse.test(body)) {
            throw new Error(body);
        }
    }
}
