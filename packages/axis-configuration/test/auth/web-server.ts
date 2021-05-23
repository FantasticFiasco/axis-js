import * as express from 'express';
import { AddressInfo, Server } from 'net';

const ADDRESS = '127.0.0.1';
const PORT = 0;

export class WebServer {
    private server?: Server;

    address?: string;
    port?: number;

    get guestUri(): string {
        return `http://${this.address}:${this.port}/guest`;
    }

    listen(): Promise<void> {
        const app = express();

        app.get('/guest', (_: express.Request, res: express.Response) => {
            res.send('Success');
        });

        return new Promise((resolve) => {
            this.server = app.listen(PORT, ADDRESS, () => {
                this.address = (this.server?.address() as AddressInfo)?.address;
                this.port = (this.server?.address() as AddressInfo)?.port;

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
}
