import * as express from 'express';
import { AddressInfo, Server } from 'net';

export class WebServer {
    private server?: Server;
    private address?: string;
    private port?: number;

    readonly username = 'some-user';
    readonly password = 'some-password';

    get guestUri(): string {
        return `http://${this.address}:${this.port}/guest`;
    }

    get basicAuthUri(): string {
        return `http://${this.address}:${this.port}/basic-auth`;
    }

    get digestAuthUri(): string {
        return `http://${this.address}:${this.port}/digest-auth`;
    }

    listen(address: string, port: number): Promise<void> {
        const app = express();

        app.get('/guest', this.handleGuest);
        app.get('/basic-auth', this.handleBasicAuth);
        app.get('/digest-auth', this.handleDigestAuth);

        return new Promise((resolve) => {
            this.server = app.listen(port, address, () => {
                this.address = (this.server!.address() as AddressInfo)!.address;
                this.port = (this.server!.address() as AddressInfo)!.port;

                resolve();
            });
        });
    }

    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.server) {
                reject('Express server is not defined');
            } else {
                this.server.close((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    }

    private handleGuest = (_: express.Request, res: express.Response) => {
        res.send('Success');
    };

    private handleBasicAuth = (req: express.Request, res: express.Response) => {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Basic ')) {
            res.status(401).header('www-authenticate', 'Basic realm="AXIS_0123456789AB"').send();
            return;
        }

        const { username, password } = this.decryptBasicAuth(header);

        if (username !== this.username || password !== this.password) {
            res.status(401).send();
            return;
        }

        res.send('Success');
    };

    private handleDigestAuth = (_: express.Request, res: express.Response) => {
        res.status(401).send();
    };

    private decryptBasicAuth = (authorizationHeader: string) => {
        const token = authorizationHeader.replace(/^Basic /, '');
        const credentials = Buffer.from(token, 'base64').toString();
        const [username, password] = credentials.split(':');
        return {
            username,
            password,
        };
    };
}
