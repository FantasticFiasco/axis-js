import { clientProvider } from './auth/client-provider';
import { Connection } from './Connection';
import { Response } from './Response';

/**
 * Send a HTTP GET request to the device.
 * @param connection The connection to the device.
 * @param relativePath The relative path.
 */
export const get = (connection: Connection, relativePath: string): Promise<Response> => {
    const url = connection.url + format(relativePath);
    const client = clientProvider('GET', url, connection.username, connection.password, connection?.options?.agent);
    return client.get(url, { responseType: 'buffer' });
};

const format = (relativePath: string): string => {
    if (relativePath.startsWith('/')) {
        return relativePath;
    }

    return '/' + relativePath;
};
