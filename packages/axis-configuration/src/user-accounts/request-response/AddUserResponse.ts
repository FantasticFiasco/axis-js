import { DeviceResponse } from 'axis-core';
import * as cheerio from 'cheerio';
import { UserAlreadyExistsError } from '../..';

export class AddUserResponse extends DeviceResponse {
    constructor(response: Response) {
        super(response);
    }

    private static readonly SuccessResponse = /Created account .*\./;
    private static readonly UserAlreadyExistsResponse = /Error: this user name already exists, consult the system log file/;

    public async assertSuccess(): Promise<void> {
        if (!this._response.ok) {
            throw new Error(`Failed to add user: ${this._response.statusText}`);
        }

        const text = await this._response.text();
        const document = cheerio.load(text);
        const body = document.html('body');

        if (!body) {
            throw new Error('No HTML in response body');
        }

        if (AddUserResponse.UserAlreadyExistsResponse.test(body)) {
            throw new UserAlreadyExistsError();
        }

        if (!AddUserResponse.SuccessResponse.test(body)) {
            throw new Error(body);
        }
    }
}
