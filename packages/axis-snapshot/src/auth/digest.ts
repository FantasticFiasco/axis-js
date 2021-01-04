import { createHash } from 'crypto';
import { parse } from 'url';

export interface Challenge {
    type: 'Digest';
    realm: string;
    nonce: string;
    qop?: string;
    opaque?: string;
    algorithm?: string;
}

export const generateAuthorizationHeader = (url: string, username: string, password: string, challenge: Challenge): string => {
    if (challenge.algorithm !== undefined && challenge.algorithm !== 'MD5') {
        throw new Error(`Unsupported digest algorithm: ${challenge.algorithm}`);
    }
    if (challenge.qop !== undefined && challenge.qop !== 'auth') {
        throw new Error(`Unsupported digest qop: ${challenge.qop}`);
    }

    const ha1 = md5(`${username}:${challenge.realm}:${password}`);
    const ha2 = md5(`GET:${parse(url).path}`);
    const response = md5(`${ha1}:${challenge.nonce}:${ha2}`);

    return [
        challenge.type,
        `username="${username}",`,
        `realm="${challenge.realm}",`,
        `nonce="${challenge.nonce}",`,
        `uri="${parse(url).path}",`,
        `response="${response}"`,
    ].join(' ');
};

const md5 = (value: string): string => {
    const hash = createHash('md5');
    return hash.update(value).digest('hex');
};
