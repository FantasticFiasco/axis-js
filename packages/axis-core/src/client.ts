import { Connection } from './Connection';
import { parse } from './auth/challenge';
import * as basic from './auth/basic';
import * as digest from './auth/digest';

/**
 * Send a HTTP GET request to the device.
 * @param connection The connection to the device.
 * @param relativePath The relative path.
 */
export const get = (connection: Connection, relativePath: string): Promise<Response> => {
    return send("GET", connection, relativePath);
};

const send = async (method: string, connection: Connection, relativePath: string): Promise<Response> => {
    const url = connection.url + format(relativePath);
    const options: RequestInit = {
        method
    }

    let res = await fetch(url, options);
    if (res.status !== 401) {
        return res;
    }

    const wwwAuthenticate = res.headers.get('www-authenticate');
    if (!wwwAuthenticate) {
        return res;
    }

    const challenge = parse(wwwAuthenticate);
    switch (challenge.type) {
        case basic.BASIC:
            options.headers = {
                authorization: basic.createHeader(connection.username, connection.password, challenge)
            };
            break;

        case digest.DIGEST:
            options.headers = {
                authorization: digest.createHeader(
                    method,
                    url,
                    connection.username,
                    connection.password,
                    challenge,
                    challenge.qop === 'auth' ? digest.createCnonce() : undefined)
            };
            break;

        default:
            return res;
    }

    res = await fetch(url, options);
    return res;
};

const format = (relativePath: string): string => {
    if (relativePath.startsWith('/')) {
        return relativePath;
    }

    return '/' + relativePath;
};
