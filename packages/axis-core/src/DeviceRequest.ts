import { Connection } from './Connection';
import * as basic from './auth/basic';
import { parse } from './auth/challenge';
import * as digest from './auth/digest';

/**
 * Abstract class describing a HTTP request.
 */
export abstract class DeviceRequest {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection description to the device.
     */
    protected constructor(
        /**
         * Gets the connection description to the device.
         */
        protected readonly connection: Connection,
    ) {}

    /**
     * Sends a HTTP GET request to a device.
     * @param relativePath The relative path.
     */
    protected async get(relativePath: string): Promise<Response> {
        const res = await this._send('GET', relativePath);
        return res;
    }

    private async _send(method: string, relativePath: string): Promise<Response> {
        const url = this.connection.url + this.format(relativePath);
        const options: RequestInit = {
            method,
        };

        let res = await fetch(url, options);
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
                options.headers = {
                    authorization: basic.createHeader(this.connection.username, this.connection.password, challenge),
                };
                break;

            case digest.DIGEST:
                options.headers = {
                    authorization: digest.createHeader(
                        method,
                        url,
                        this.connection.username,
                        this.connection.password,
                        challenge,
                        challenge.qop === 'auth' ? digest.createCnonce() : undefined,
                    ),
                };
                break;

            default:
                return res;
        }

        res = await fetch(url, options);
        return res;
    }

    format = (relativePath: string): string => {
        if (relativePath.startsWith('/')) {
            return relativePath;
        }

        return '/' + relativePath;
    };
}
