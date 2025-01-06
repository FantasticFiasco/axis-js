import { DeviceResponse } from 'axis-core';
import { UpdateParametersError } from '../..';

export class UpdateParametersResponse extends DeviceResponse {
    constructor(response: Response) {
        super(response);
    }

    // A success is described by the following response:
    // OK
    private static readonly SuccessResponse = /OK/;

    // An error is described in the following format:
    // # Error: Error setting '[PARAMETER]' to '[VALUE]'!
    private static readonly ParameterErrorResponse = /# Error: Error setting '(.*)' to '(.*)'!/;

    public async assertSuccess(): Promise<void> {
        if (!this._response.ok) {
            throw new Error(`Failed to update parameters: ${this._response.statusText}`);
        }

        const text = await this._response.text();

        if (UpdateParametersResponse.SuccessResponse.test(text)) {
            return;
        }

        const parameterErrors = text.split('\n');

        const parameterErrorNames = parameterErrors.reduce<string[]>((result, parameter) => {
            const match = UpdateParametersResponse.ParameterErrorResponse.exec(parameter);

            if (match) {
                result.push(match[1]);
            }

            return result;
        }, []);

        throw new UpdateParametersError(parameterErrorNames);
    }
}
