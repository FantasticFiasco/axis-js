import { DeviceResponse } from 'axis-core';

export class UpdateUserResponse extends DeviceResponse {
    constructor(response: string) {
        super(response);
    }

    private static readonly SuccessResponse = /Modified account .*\./;

    public assertSuccess(): void {
        const body: string | null = this._body;

        if (body === null) {
            throw new Error('No HTML in response body');
        }

        if (!UpdateUserResponse.SuccessResponse.test(body)) {
            throw new Error(body);
        }
    }
}
