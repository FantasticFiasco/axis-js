import got, { CancelableRequest, Got, Response } from 'got';
import * as http from 'http';
import * as https from 'https';
import * as basic from './basic';
import { parse } from './challenge';
import * as digest from './digest';

export const get = (url: string, username: string, password: string, agent?: http.Agent | https.Agent): CancelableRequest<Response<Buffer>> => {
    return client('GET', url, username, password, agent).get<Buffer>(url);
};

export const client = (method: string, url: string, username: string, password: string, agent?: http.Agent | https.Agent): Got => {
    return got.extend({
        agent: createAgent(agent),
        responseType: 'buffer',
        hooks: {
            afterResponse: [
                (res, retryWithMergedOptions) => {
                    if (res.statusCode !== 401) {
                        return res;
                    }

                    const wwwAuthenticate = res.headers['www-authenticate'];
                    if (wwwAuthenticate === undefined) {
                        return res;
                    }

                    const updatedOptions = {
                        headers: {
                            authorization: '',
                        },
                    };

                    const challenge = parse(wwwAuthenticate);
                    switch (challenge.type) {
                        case basic.BASIC:
                            updatedOptions.headers.authorization = basic.createHeader(username, password, challenge);
                            break;

                        case digest.DIGEST:
                            updatedOptions.headers.authorization = digest.createHeader(
                                method,
                                url,
                                username,
                                password,
                                challenge,
                                challenge.qop === 'auth' ? digest.cnonce() : undefined
                            );
                            break;

                        default:
                            return res;
                    }

                    return retryWithMergedOptions(updatedOptions);
                },
            ],
        },
    });
};

const createAgent = (agent?: http.Agent | https.Agent): { http?: http.Agent; https?: https.Agent } => {
    return {
        http: agent instanceof http.Agent ? agent : undefined,
        https: agent instanceof https.Agent ? agent : undefined,
    };
};
