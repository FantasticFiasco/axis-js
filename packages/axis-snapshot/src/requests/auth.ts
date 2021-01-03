import { createHash } from 'crypto';
import got, { HTTPError, Response } from 'got';
import { parse } from 'url';

export const get = async (url: string, username: string, password: string): Promise<Response<string> | undefined> => {
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

    const challenge = parseChallenge(wwwAuthenticate);

    switch (challenge.type) {
        case 'Basic':
            ({ error, res } = await basicAuth(url, username, password));
            break;

        case 'Digest':
            ({ error, res } = await digestAuth(url, username, password, challenge));
            break;
    }

    if (error !== undefined) {
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

interface BasicAuthChallenge {
    type: 'Basic';
    // TODO: Realm?
}

interface DigestAuthChallenge {
    type: 'Digest';
    realm: string;
    qop?: string;
    nonce: string;
    opaque: string;
    algorithm?: string;
}

const parseChallenge = (wwwAuthenticate: string): BasicAuthChallenge | DigestAuthChallenge => {
    const typeStopIndex = wwwAuthenticate.indexOf(' ');
    const type = wwwAuthenticate.substring(0, typeStopIndex);

    if (type === 'Basic') {
        const challenge: BasicAuthChallenge = {
            type,
        };
        return challenge;
    }

    if (type === 'Digest') {
        const params = wwwAuthenticate
            .substring(typeStopIndex)
            .split(',')
            .map((param) => {
                const index = param.indexOf('=');
                const name = param.substring(0, index).trim();
                const value = param
                    .substring(index + 1)
                    .trim()
                    .replace(/"/g, '');
                return {
                    name,
                    value,
                };
            });

        const realm = params.find((param) => param.name === 'realm')?.value;
        if (realm === undefined) {
            throw new Error('Digest challenge has no realm');
        }

        const qop = params.find((param) => param.name === 'qop')?.value;

        const nonce = params.find((param) => param.name === 'nonce')?.value;
        if (nonce === undefined) {
            throw new Error('Digest challenge has no nonce');
        }

        const opaque = params.find((param) => param.name === 'opaque')?.value;
        if (opaque === undefined) {
            throw new Error('Digest challenge has no opaque');
        }

        const algorithm = params.find((param) => param.name === 'algorithm')?.value;

        const challenge: DigestAuthChallenge = {
            type,
            realm,
            qop,
            nonce,
            opaque,
            algorithm,
        };

        return challenge;
    }

    throw new Error(`Auth type '${type}' is not supported`);
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

const digestAuth = async (
    url: string,
    username: string,
    password: string,
    challenge: DigestAuthChallenge
): Promise<{ error: HTTPError; res: undefined } | { error: undefined; res: Response<string> }> => {
    if (challenge.algorithm !== undefined && challenge.algorithm !== 'MD5') {
        throw new Error(`Unsupported digest algorithm: ${challenge.algorithm}`);
    }
    if (challenge.qop !== undefined && challenge.qop !== 'auth') {
        throw new Error(`Unsupported digest qop: ${challenge.qop}`);
    }

    // If the algorithm directive's value is "MD5" or unspecified, then HA1 is
    //   HA1 = MD5(username:realm:password)
    const ha1 = createHash('md5').update(`${username}:${challenge.realm}:${password}`).digest('hex');

    // If the qop directive's value is "auth" or is unspecified, then HA2 is
    //   HA2 = MD5(method:digestURI)
    const ha2 = createHash('md5')
        .update(`GET:${parse(url).path}`)
        .digest('hex');

    // If the qop directive's value is "auth" or "auth-int", then compute the response as follows:
    //   response = MD5(HA1:nonce:nonceCount:cnonce:qop:HA2)
    const response = createHash('md5').update(`${ha1}:${challenge.nonce}:00000001:0a4f113b:${challenge.qop}:${ha2}`).digest('hex');
    const auth = `Digest username="${username}", realm="${challenge.realm}", nonce="${challenge.nonce}", uri="${parse(url).path}", qop=${
        challenge.qop
    }, nc=00000001, cnonce="0a4f113b", response="${response}", opaque="${challenge.opaque}"`;

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
