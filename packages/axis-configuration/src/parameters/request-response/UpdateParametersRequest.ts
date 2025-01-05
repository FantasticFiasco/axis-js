import { Connection, DeviceRequest } from 'axis-core';
import { UpdateParametersResponse } from './UpdateParametersResponse';

export class UpdateParametersRequest extends DeviceRequest {
    constructor(connection: Connection, parameters: { [name: string]: string }) {
        super(connection);
        this.parameters = parameters;
    }

    private readonly parameters: { [name: string]: string };

    public async send(): Promise<UpdateParametersResponse> {
        const res = await this._get(this.relativePath);

        return new UpdateParametersResponse(response.toString());
    }

    public get relativePath(): string {
        const parameterArguments = Object.keys(this.parameters)
            .map((name) => {
                return name + '=' + this.parameters[name];
            })
            .join('&');

        return `/axis-cgi/param.cgi?action=update&${parameterArguments}`;
    }
}
