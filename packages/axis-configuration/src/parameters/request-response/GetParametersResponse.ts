import * as _ from 'lodash';
import { Response } from './../../shared/Response';

export class GetParametersResponse extends Response {
    // A parameter has the following format:
    // [NAME]=[VALUE]
    private static readonly ParameterSuccessResponse = /(?:root\.)?(\S*)\s*=\s*(.*)\s*$/;
    // An error is described in the following format:
    // # Error: Error -1 getting param in group '[PARAMETER]'
    private static readonly ErrorResponse = /# Error:/;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess() {
        // No errors are reported in the response body, thus no action is needed here
    }

    public get parameters(): { [name: string]: string } {
        const parameters = this.response.split('\n');

        return _.reduce(
            parameters,
            (result: { [name: string]: string }, parameter: string) => {
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
            },
            {}
        );
    }
}
