import { Connection } from '../..';
import { Request } from '../../shared/Request';
import { UpdateParametersResponse } from './UpdateParametersResponse';

export class UpdateParametersRequest extends Request {
    private readonly parameters: { [name: string]: string };

    constructor(connection: Connection, parameters: { [name: string]: string }) {
        super(connection);
        this.parameters = parameters;
    }

    public async send(): Promise<UpdateParametersResponse> {
        const response = await this.get(this.url);

        return new UpdateParametersResponse(response);
    }

    public get url(): string {
        const parameterArguments = _.reduce(
            this.parameters,
            (result: string, value: string, name: string) => {
                return `${result}&${name}=${value}`;
            },
            ''
        );

        return `${this.connection.url}/axis-cgi/param.cgi?action=update${parameterArguments}`;
    }
}
