import { DeviceResponse } from 'axis-core';

export class RestartResponse extends DeviceResponse {
    constructor(response: string) {
        super(response);
    }

    private static readonly SuccessResponse = /restartMessage/i;

    public assertSuccess(): void {
        if (RestartResponse.SuccessResponse.test(this.response)) {
            return;
        }

        let body: string | null = this.body;

        if (body !== null) {
            body = body.trim();
            if (body) {
                throw new Error(body);
            }
        }

        throw new Error('Request to restart device was not successful');
    }
}
