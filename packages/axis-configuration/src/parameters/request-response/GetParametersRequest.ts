import { Connection, DeviceRequest } from 'axis-core';
import { Converter } from './Converter';
import { GetParametersResponse } from './GetParametersResponse';

export class GetParametersRequest extends DeviceRequest {
    constructor(connection: Connection, ...parameterGroups: string[]) {
        super(connection);
        this.parameterGroups = parameterGroups;
    }

    private readonly parameterGroups: string[];

    public async send(): Promise<GetParametersResponse> {
        const response = await this._get(this.relativePath);
        const body = await response.text();

        return new GetParametersResponse(body);
    }

    public get relativePath(): string {
        return `/axis-cgi/param.cgi?action=list${Converter.toGroup(this.parameterGroups)}&responseformat=rfc`;
    }
}
