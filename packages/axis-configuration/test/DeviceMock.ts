import * as express from 'express';
import { AddressInfo, Server } from 'net';
import * as passport from 'passport';
import { DigestStrategy } from 'passport-http';

export class DeviceMock {
    private server?: Server;
    private address?: string;
    private port?: number;

    readonly username = 'some-user';
    readonly password = 'some-password';

    get uri(): string {
        return `http://${this.address}:${this.port}`;
    }

    listen(address: string, port: number): Promise<void> {
        const app = express();

        passport.use(
            new DigestStrategy(
                {
                    realm: 'AXIS_0123456789AB',
                    algorithm: 'MD5',
                    qop: 'auth',
                },
                (username, done) => {
                    if (username != this.username) {
                        return done(null, false);
                    }

                    done(null, true, this.password);
                },
            ),
        );

        app.get('/axis-cgi/param.cgi', passport.authenticate('digest', { session: false }), this.#paramHandler);
        app.get('/axis-cgi/pwdgrp.cgi', passport.authenticate('digest', { session: false }), this.#pwdgrpHandler);

        return new Promise((resolve) => {
            this.server = app.listen(port, address, () => {
                this.address = (this.server?.address() as AddressInfo).address;
                this.port = (this.server?.address() as AddressInfo).port;

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

    #paramHandler = (req: express.Request, res: express.Response) => {
        switch (req.query.action) {
            case 'list':
                this.#listParameters(req, res);
                break;

            default:
                res.status(400).send();
        }
    };

    #listParameters = (req: express.Request, res: express.Response) => {
        const responseLines: string[] = [];

        const group = req.query.group as string;
        const parameters = group.split(',');

        for (const parameter of parameters) {
            switch (parameter) {
                case 'Network.Bonjour.FriendlyName':
                    responseLines.push('Network.Bonjour.FriendlyName=Main Entrance');
                    break;
                case 'Network.Bonjour.Enabled':
                    responseLines.push('Network.Bonjour.Enabled=yes');
                    break;
                default:
                    responseLines.push(`# Error: Error -1 getting param in group '${parameter}'`);
                    break;
            }
        }

        res.send(responseLines.join('\r\n'));
    };

    #pwdgrpHandler = (_: express.Request, res: express.Response) => {
        res.send('Success');
    };
}
