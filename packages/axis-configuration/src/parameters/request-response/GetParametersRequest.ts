import { Connection } from '../..';
import { Request } from '../../shared/Request';
import { Converter } from './Converter';
import { GetParametersResponse } from './GetParametersResponse';

export class GetParametersRequest extends Request {
    private readonly parameterGroups: string[];

    constructor(connection: Connection, ...parameterGroups: string[]) {
        super(connection);
        this.parameterGroups = parameterGroups;
    }

    public async send(): Promise<GetParametersResponse> {
        const response = await this.get(this.url);

        return new GetParametersResponse(response);
    }

    public get url(): string {
        return `${this.connection.url}/axis-cgi/param.cgi?action=list${Converter.toGroup(this.parameterGroups)}&responseformat=rfc`;
    }
}
