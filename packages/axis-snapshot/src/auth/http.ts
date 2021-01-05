import { Response } from 'got';

export const get = async (url: string, username: string, password: string): Promise<Response<string> | undefined> => {
    throw new Error('Not implemented');
    // let wwwAuthenticate: string | string[] | undefined;

    // // Send request without authentication
    // try {
    //     const res = await got.get(url);
    //     return res;
    // } catch (error) {
    //     if (!(error instanceof HTTPError)) {
    //         throw error;
    //     }

    //     if (error.response.statusCode !== 401) {
    //         throw error;
    //     }

    //     wwwAuthenticate = error.response.headers['wwwAuthenticate'];
    //     if (wwwAuthenticate === undefined) {
    //         throw error;
    //     }
    // }

    // const challenge = parse(wwwAuthenticate);

    // switch (challenge.type) {
    //     case 'Basic':
    //         ({ error, res } = await basicAuth(url, username, password));
    //         break;

    //     case 'Digest':
    //         ({ error, res } = await digestAuth(url, username, password, challenge));
    //         break;
    // }

    // if (error !== undefined) {
    //     throw error;
    // }
    // return res;
};
