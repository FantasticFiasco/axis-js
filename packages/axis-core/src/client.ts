import * as http from 'http';
import * as https from 'https';
import { client } from './auth/client';
import { Response } from './Response';

/**
 * Send a HTTP GET request to the device.
 */
export const get = (url: string, username: string, password: string, agent?: http.Agent | https.Agent): Promise<Response> => {
    return client('GET', url, username, password, agent).get<Buffer>(url);
};
