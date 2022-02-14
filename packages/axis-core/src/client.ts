import { Connection, Response } from '.';
import { client } from './auth/client';

/**
 * Send a HTTP GET request to the device.
 * @param connection The connection to the device.
 * @param relativePath The relative path.
 */
export const get = (connection: Connection, relativePath: string): Promise<Response> => {
    const url = connection.url + format(relativePath);
    return client('GET', url, connection.username, connection.password, connection?.options?.agent).get<Buffer>(url);
};

const format = (relativePath: string): string => {
    if (relativePath.startsWith('/')) {
        return relativePath;
    }

    return '/' + relativePath;
};
