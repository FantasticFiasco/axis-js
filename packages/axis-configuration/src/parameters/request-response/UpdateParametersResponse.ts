import * as _ from 'lodash';
import { UpdateParametersError } from '../..';
import { Response } from '../../shared/Response';

export class UpdateParametersResponse extends Response {
    // A success is described by the following response:
    // OK
    private static readonly SuccessResponse = /OK/;
    // An error is described in the following format:
    // # Error: Error -1 getting param in group '[PARAMETER]'
    private static readonly ParameterErrorResponse = /# Error: Error setting '(.*)' to '(.*)'!/;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess() {
        if (UpdateParametersResponse.SuccessResponse.test(this.response)) {
            return;
        }

        const parameterErrors = this.response.split('\n');
        const parameterErrorNames = _.reduce(
            parameterErrors,
            (result: string[], parameter: string) => {
                const match = UpdateParametersResponse.ParameterErrorResponse.exec(parameter);

                if (match) {
                    result.push(match[1]);
                }

                return result;
            },
            []
        );

        throw new UpdateParametersError(parameterErrorNames);
    }
}
