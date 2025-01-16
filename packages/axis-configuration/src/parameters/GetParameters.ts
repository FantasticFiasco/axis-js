import { Connection, DeviceRequest } from 'axis-core';
import { Converter } from './Converter';

export class GetParametersRequest extends DeviceRequest {
    constructor(connection: Connection, parameterGroups: string[] | 'all') {
        super(connection, `/axis-cgi/param.cgi?action=list${parameterGroups === 'all' ? '' : Converter.toGroup(parameterGroups)}&responseformat=rfc`);
    }
}

export const handleGetParameters = async (res: Response): Promise<Map<string, string>> => {
    if (!res.ok) {
        throw new Error(`Failed to handle get parameters response: ${res.status} ${res.statusText}`);
    }

    // text/plain;charset=UTF-8
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'text/plain') {
        throw new Error(`Failed to handle get parameters response, invalid content type: ${contentType}`);
    }

    const parameters = new Map<string, string>();

    const text = await res.text();
    const lines = text.split('\n');

    for (const line of lines) {
        if (ERROR_RESPONSE.test(line)) {
            continue;
        }

        const match = PARAMETER_SUCCESS_RESPONSE.exec(line);
        if (match) {
            const name = match[1];
            const value = match[2].trim();
            parameters.set(name, value);
        }
    }

    return parameters;
};

// A parameter has the following format:
// [NAME]=[VALUE]
const PARAMETER_SUCCESS_RESPONSE = /(?:root\.)?(\S*)\s*=\s*(.*)\s*$/;

// An error is described in the following format:
// # Error: Error -1 getting param in group '[PARAMETER]'
const ERROR_RESPONSE = /# Error:/;
