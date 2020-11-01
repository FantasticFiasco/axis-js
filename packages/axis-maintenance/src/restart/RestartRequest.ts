import { Connection } from '..';
import { Request } from '../shared/Request';
import { RestartResponse } from './RestartResponse';

export class RestartRequest extends Request {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(): Promise<RestartResponse> {
        const response = await this.get(this.url);

        return new RestartResponse(response);
    }

    public get url(): string {
        return `${this.connection.url}/axis-cgi/restart.cgi`;
    }
}
