import { Connection, DeviceRequest } from 'axis-core';
import { UpdateParametersResponse } from './UpdateParametersResponse';

export class UpdateParametersRequest extends DeviceRequest {
    private readonly parameters: Record<string, string>;

    constructor(connection: Connection, parameters: Record<string, string>) {
        super(connection);
        this.parameters = parameters;
    }

    public async send(): Promise<UpdateParametersResponse> {
        const response = await this.get(this.relativePath());

        return new UpdateParametersResponse(response.toString());
    }

    public relativePath(): string {
        const parameterArguments = Object.keys(this.parameters)
            .map((name) => {
                return name + '=' + this.parameters[name];
            })
            .join('&');

        return `/axis-cgi/param.cgi?action=update&${parameterArguments}`;
    }
}
