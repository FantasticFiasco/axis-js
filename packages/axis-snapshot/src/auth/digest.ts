import { createHash } from 'crypto';
import { parse } from 'url';
import { v4 as uuidv4 } from 'uuid';

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

    const path = parse(url).path;
    const ha1 = md5(`${username}:${challenge.realm}:${password}`);
    const ha2 = md5(`GET:${path}`);

    const response =
        challenge.qop === 'auth'
            ? md5(`${ha1}:${challenge.nonce}:00000001:MWE0MzZiOWZmZmNiZGJiMGIwYjQ1OTI4ZTVkYTA5NDg=:auth:${ha2}`)
            : md5(`${ha1}:${challenge.nonce}:${ha2}`);

    const params: string[] = [`username="${username}"`, `realm="${challenge.realm}"`, `nonce="${challenge.nonce}"`, `uri="${path}"`];

    // TODO: If cnonce
    params.push('cnonce="MWE0MzZiOWZmZmNiZGJiMGIwYjQ1OTI4ZTVkYTA5NDg="');

    // TODO: If nc
    params.push('nc=00000001');

    if (challenge.qop !== undefined) {
        params.push(`qop=${challenge.qop}`);
    }

    params.push(`response="${response}"`);

    if (challenge.algorithm !== undefined) {
        params.push(`algorithm=${challenge.algorithm}`);
    }

    return `${challenge.type} ${params.join(', ')}`;
};

export const cnonce = (): string => {
    return uuidv4().replace(/-/g, '');
};

const md5 = (value: string): string => {
    const hash = createHash('md5');
    return hash.update(value).digest('hex');
};
