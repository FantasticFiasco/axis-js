import { DeviceResponse, UnknownError } from 'axis-core';

export class UpdateUserResponse extends DeviceResponse {
    constructor(response: string) {
        super(response);
    }

    private static readonly SuccessResponse = /Modified account .*\./;

    public assertSuccess(): void {
        const body: string | null = this.body;

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
