import { Connection, DeviceRequest } from 'axis-core';
import { Converter } from './Converter';
import { GetParametersResponse } from './GetParametersResponse';

export class GetParametersRequest extends DeviceRequest {
    private readonly parameterGroups: string[];

    constructor(connection: Connection, ...parameterGroups: string[]) {
        super(connection);
        this.parameterGroups = parameterGroups;
    }

    public async send(): Promise<GetParametersResponse> {
        const response = await this.get(this.relativePath());

        return new GetParametersResponse(response.toString());
    }

    public relativePath(): string {
        return `/axis-cgi/param.cgi?action=list${Converter.toGroup(this.parameterGroups)}&responseformat=rfc`;
    }
}
