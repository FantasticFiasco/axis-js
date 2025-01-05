import { DeviceResponse } from 'axis-core';

export class GetParametersResponse extends DeviceResponse {
    constructor(response: Response) {
        super(response);
    }

    // A parameter has the following format:
    // [NAME]=[VALUE]
    private static readonly ParameterSuccessResponse = /(?:root\.)?(\S*)\s*=\s*(.*)\s*$/;

    // An error is described in the following format:
    // # Error: Error -1 getting param in group '[PARAMETER]'
    private static readonly ErrorResponse = /# Error:/;

    public async assertSuccess(): Promise<void> {
        if (this._response.ok) {
            return;
        }
    }

    public get parameters(): { [name: string]: string } {
        const parameters = this._response.split('\n');

        return parameters.reduce<{ [name: string]: string }>((result, parameter) => {
            if (GetParametersResponse.ErrorResponse.test(parameter)) {
                return result;
            }

            const match = GetParametersResponse.ParameterSuccessResponse.exec(parameter);
            if (match) {
                const name = match[1];
                const value = match[2].trim();
                result[name] = value;
            }

            return result;
        }, {});
    }
}
