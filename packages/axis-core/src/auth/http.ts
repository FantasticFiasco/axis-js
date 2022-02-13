import * as http from 'http';
import * as https from 'https';
import { client } from './client';

/**
 * Interface describing a response from a camera.
 */
export interface Response {
    /**
     * The HTTP status code.
     */
    statusCode: number;

    /**
     * The response headers.
     */
    headers: NodeJS.Dict<string | string[]>;

    /**
     * The response body.
     */
    body: Buffer;
}

/**
 * Send a HTTP GET request to the device.
 */
export const get = (url: string, username: string, password: string, agent?: http.Agent | https.Agent): Promise<Response> => {
    return client('GET', url, username, password, agent).get<Buffer>(url);
};
