import { Connection, Response } from '.';
import { client } from './auth/client';

/**
 * Send a HTTP GET request to the device.
 */
export const get = (connection: Connection, path: string): Promise<Response> => {
    const url = connection.url + formatPath(path);
    return client('GET', url, connection.username, connection.password, connection?.options?.agent).get<Buffer>(url);
};

const formatPath = (path: string): string => {
    if (path.startsWith('/')) {
        return path;
    }

    return '/' + path;
};
