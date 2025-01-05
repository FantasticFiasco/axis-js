import { Connection, DeviceRequest } from 'axis-core';
import { Converter } from './Converter';
import { GetParametersResponse } from './GetParametersResponse';

export class GetParametersRequest extends DeviceRequest {
    constructor(connection: Connection, ...parameterGroups: string[]) {
        super(connection);
        this.#parameterGroups = parameterGroups;
    }

    readonly #parameterGroups: string[];

    public async send(): Promise<GetParametersResponse> {
        const res = await this._get(this.relativePath);
        return new GetParametersResponse(res);
    }

    public get relativePath(): string {
        return `/axis-cgi/param.cgi?action=list${Converter.toGroup(this.#parameterGroups)}&responseformat=rfc`;
    }
}
