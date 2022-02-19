import * as basic from './basic';
import * as digest from './digest';

export const parse = (wwwAuthenticateHeader: string): basic.Challenge | digest.Challenge => {
    const challenge = toChallenge(wwwAuthenticateHeader);

    if (challenge.type === basic.BASIC) {
        return {
            type: challenge.type,
            realm: challenge.mustGet('realm'),
        };
    }

    if (challenge.type === digest.DIGEST) {
        return {
            type: challenge.type,
            realm: challenge.mustGet('realm'),
            nonce: challenge.mustGet('nonce'),
            qop: challenge.get('qop'),
            opaque: challenge.get('opaque'),
            algorithm: challenge.get('algorithm'),
        };
    }

    throw new Error(`Auth protocol ${challenge.type} is not supported`);
};

const toChallenge = (wwwAuthenticateHeader: string): Challenge => {
    const typeStopIndex = wwwAuthenticateHeader.indexOf(' ');
    const type = wwwAuthenticateHeader.substring(0, typeStopIndex);
    const params = wwwAuthenticateHeader
        .substring(typeStopIndex)
        .split(',')
        .reduce((map, param) => {
            const separatorIndex = param.indexOf('=');
            const name = param.substring(0, separatorIndex).trim();
            const value = param
                .substring(separatorIndex + 1)
                .trim()
                .replace(/"/g, '');

            map.set(name, value);
            return map;
        }, new Map<string, string>());

    return new Challenge(type, params);
};

class Challenge {
    constructor(public readonly type: string, private readonly params: Map<string, string>) {}

    get = (name: string): string | undefined => {
        return this.params.get(name);
    };

    mustGet = (name: string): string => {
        const value = this.params.get(name);
        if (value === undefined) {
            throw new Error(`Challenge does not have required parameter "${name}"`);
        }
        return value;
    };
}
