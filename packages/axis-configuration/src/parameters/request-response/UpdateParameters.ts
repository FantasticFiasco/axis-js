import { Connection, DeviceRequest } from 'axis-core';
import { UpdateParametersError } from '../UpdateParametersError';

export class UpdateParametersRequest extends DeviceRequest {
    constructor(connection: Connection, parameters: Map<string, string>) {
        const relativePath = `/axis-cgi/param.cgi?action=update&${Array.from(parameters.entries())
            .map(([name, value]) => {
                return `${name}=${value}`;
            })
            .join('&')}`;

        super(connection, relativePath);
    }
}

export const handleUpdateParameters = async (res: Response): Promise<void> => {
    if (!res.ok) {
        throw new Error(`Failed to handle update parameters response: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (contentType !== 'text/plain') {
        throw new Error(`Failed to handle update parameters response, invalid content type: ${contentType}`);
    }

    const text = await res.text();

    if (SUCCESS_RESPONSE.test(text)) {
        return;
    }

    const parameterErrors = text.split('\n');

    const parameterErrorNames = parameterErrors.reduce<string[]>((result, parameter) => {
        const match = PARAMETER_ERROR_RESPONSE.exec(parameter);

        if (match) {
            result.push(match[1]);
        }

        return result;
    }, []);

    throw new UpdateParametersError(parameterErrorNames);
};

// A success is described by the following response:
// OK
const SUCCESS_RESPONSE = /OK/;

// An error is described in the following format:
// # Error: Error setting '[PARAMETER]' to '[VALUE]'!
const PARAMETER_ERROR_RESPONSE = /# Error: Error setting '(.*)' to '(.*)'!/;
