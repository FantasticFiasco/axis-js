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
        if (!this._response.ok) {
            throw new Error(`Failed to get parameters: ${this._response.statusText}`);
        }
    }

    public async parameters(): Promise<Map<string, string>> {
        const parameters = new Map<string, string>();

        const text = await this._response.text();
        const lines = text.split('\n');

        for (const line of lines) {
            if (GetParametersResponse.ErrorResponse.test(line)) {
                continue;
            }

            const match = GetParametersResponse.ParameterSuccessResponse.exec(line);
            if (match) {
                const name = match[1];
                const value = match[2].trim();
                parameters.set(name, value);
            }
        }

        return parameters;
    }
}
