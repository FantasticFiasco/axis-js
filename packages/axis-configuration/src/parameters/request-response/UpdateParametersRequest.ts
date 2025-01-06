import { Connection, DeviceRequest } from 'axis-core';
import { UpdateParametersResponse } from './UpdateParametersResponse';

export class UpdateParametersRequest extends DeviceRequest {
    constructor(connection: Connection, parameters: Map<string, string>) {
        super(connection);
        this.parameters = parameters;
    }

    private readonly parameters: Map<string, string>;

    public async send(): Promise<UpdateParametersResponse> {
        const res = await this._get(this.relativePath);
        return new UpdateParametersResponse(res);
    }

    public get relativePath(): string {
        const parameterArguments = Array.from(this.parameters.keys())
            .map((name) => {
                return name + '=' + this.parameters.get(name);
            })
            .join('&');

        return `/axis-cgi/param.cgi?action=update&${parameterArguments}`;
    }
}
