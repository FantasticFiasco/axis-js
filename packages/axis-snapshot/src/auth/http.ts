import got, { Response } from 'got';
import * as basic from './basic';
import { parse } from './challenge';
import * as digest from './digest';

// TODO: Use agent if supplied

export const get = async (url: string, username: string, password: string): Promise<Response<string> | undefined> => {
    return client(url, username, password).get(url);
};

const client = (url: string, username: string, password: string) =>
    got.extend({
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
                            updatedOptions.headers.authorization = basic.generateAuthorizationHeader(username, password, challenge);
                            break;

                        case 'Digest':
                            updatedOptions.headers.authorization = digest.generateAuthorizationHeader(url, username, password, challenge);
                            break;

                        default:
                            return res;
                    }

                    return retryWithMergedOptions(updatedOptions);
                },
            ],
        },
    });
