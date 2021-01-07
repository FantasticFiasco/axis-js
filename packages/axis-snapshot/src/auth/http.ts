import got, { CancelableRequest, Got, Response } from 'got';
import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import * as basic from './basic';
import { parse } from './challenge';
import * as digest from './digest';

export const get = (url: string, username: string, password: string, agent?: HttpAgent | HttpsAgent): CancelableRequest<Response<Buffer>> => {
    return client(url, username, password, agent).get<Buffer>(url);
};

export const client = (url: string, username: string, password: string, agent?: HttpAgent | HttpsAgent): Got => {
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
                        case 'Basic':
                            updatedOptions.headers.authorization = basic.createAuthorizationHeader(username, password, challenge);
                            break;

                        case 'Digest':
                            updatedOptions.headers.authorization = digest.createAuthorizationHeader(
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

const createAgent = (agent?: HttpAgent | HttpsAgent): { http?: HttpAgent; https?: HttpsAgent } => {
    return {
        http: agent instanceof HttpAgent ? agent : undefined,
        https: agent instanceof HttpsAgent ? agent : undefined,
    };
};
