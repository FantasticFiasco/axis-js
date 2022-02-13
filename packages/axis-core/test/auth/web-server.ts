import * as express from 'express';
import { AddressInfo, Server } from 'net';
import * as passport from 'passport';
import { BasicStrategy, DigestStrategy } from 'passport-http';

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

        passport.use(
            new BasicStrategy((username, password, done) => {
                done(null, username === this.username && password === this.password);
            })
        );

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
                }
            )
        );

        app.get('/guest', this.successResponse);
        app.get('/basic-auth', passport.authenticate('basic', { session: false }), this.successResponse);
        app.get('/digest-auth', passport.authenticate('digest', { session: false }), this.successResponse);

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

    private successResponse = (_: express.Request, res: express.Response) => {
        res.send('Success');
    };
}
