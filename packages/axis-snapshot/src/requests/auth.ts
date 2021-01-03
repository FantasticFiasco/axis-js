import got, { HTTPError, Response } from 'got';

export const get = async (url: string, username: string, password: string) => {
    // Send request without authentication
    let { error, res } = await noAuth(url);

    if (error === undefined) {
        return res;
    }

    if (error.response.statusCode !== 401) {
        throw error;
    }

    const wwwAuthenticate = error.response.headers['www-authenticate'];
    if (wwwAuthenticate === undefined) {
        throw error;
    }

    const protocol = wwwAuthenticate.split(' ')[0];
    switch (protocol) {
        case 'Basic':
            ({ error, res } = await basicAuth(url, username, password));
            if (error !== undefined) {
                throw error;
            }
            return res;

        case 'Digest':
            console.log('digest');
            break;

        default:
            throw error;
    }

    return res;
};

const noAuth = async (url: string): Promise<{ error: HTTPError; res: undefined } | { error: undefined; res: Response<string> }> => {
    try {
        const res = await got.get(url);
        return {
            error: undefined,
            res,
        };
    } catch (error) {
        return {
            error,
            res: undefined,
        };
    }
};

const basicAuth = async (
    url: string,
    username: string,
    password: string
): Promise<{ error: HTTPError; res: undefined } | { error: undefined; res: Response<string> }> => {
    const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

    try {
        const res = await got(url, {
            headers: {
                Authorization: auth,
            },
        });
        return {
            error: undefined,
            res,
        };
    } catch (error) {
        return {
            error,
            res: undefined,
        };
    }
};

// const digestAuth = async (url: string, username: string, password: string) => {
//     const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

//     return await got(url, {
//         headers: {
//             Authorization: auth,
//         },
//     });
// };
