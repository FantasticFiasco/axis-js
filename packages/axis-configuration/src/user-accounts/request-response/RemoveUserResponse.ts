import { DeviceResponse } from 'axis-core';
import * as cheerio from 'cheerio';

export class RemoveUserResponse extends DeviceResponse {
    constructor(response: Response) {
        super(response);
    }

    private static readonly SuccessResponse = /Removed account .*\./;

    public async assertSuccess(): Promise<void> {
        if (!this._response.ok) {
            throw new Error(`Failed to remove user: ${this._response.statusText}`);
        }

        const text = await this._response.text();
        const document = cheerio.load(text);
        const body = document.html('body');

        if (!body) {
            throw new Error('No HTML in response body');
        }

        if (!RemoveUserResponse.SuccessResponse.test(body)) {
            throw new Error(body);
        }
    }
}
