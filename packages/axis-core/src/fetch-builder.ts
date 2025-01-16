import * as basic from './auth/basic';
import { parse } from './auth/challenge';
import * as digest from './auth/digest';
import { DeviceRequest } from './DeviceRequest';

type Fetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
type DeviceFetch = (input: DeviceRequest, init?: RequestInit) => Promise<Response>;

export const fetchBuilder = (fetch: Fetch): DeviceFetch => {
    return async (input: DeviceRequest, init?: RequestInit): Promise<Response> => {
        let res = await fetch(input, init);
        if (res.status !== 401) {
            return res;
        }

        const wwwAuthenticate = res.headers.get('www-authenticate');
        if (!wwwAuthenticate) {
            return res;
        }

        const challenge = parse(wwwAuthenticate);
        switch (challenge.type) {
            case basic.BASIC:
                input.headers.set('authorization', basic.createHeader(input.username, input.password, challenge));
                break;

            case digest.DIGEST:
                input.headers.set(
                    'authorization',
                    digest.createHeader(
                        input.method,
                        input.url,
                        input.username,
                        input.password,
                        challenge,
                        challenge.qop === 'auth' ? digest.createCnonce() : undefined,
                    ),
                );
                break;

            default:
                return res;
        }

        res = await fetch(input, init);
        return res;
    };
};
