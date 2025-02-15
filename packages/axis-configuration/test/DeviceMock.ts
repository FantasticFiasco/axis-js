import * as express from 'express';
import { AddressInfo, Server } from 'net';
import * as passport from 'passport';
import { DigestStrategy } from 'passport-http';
import { Generate } from './user-accounts/Generate';

export class DeviceMock {
    #server?: Server;
    #address?: string;
    #port?: number;

    readonly #parameters = new Map<string, string>([
        ['Network.Bonjour.FriendlyName', 'Main Entrance'],
        ['Network.Bonjour.Enabled', 'yes'],
    ]);

    readonly #users = new Set<string>(['root']);

    readonly username = 'some-user';
    readonly password = 'some-password';

    get uri(): string {
        return `http://${this.#address}:${this.#port}`;
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
            this.#server = app.listen(port, address, () => {
                this.#address = (this.#server?.address() as AddressInfo).address;
                this.#port = (this.#server?.address() as AddressInfo).port;

                resolve();
            });
        });
    }

    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.#server) {
                reject('Express server is not defined');
            } else {
                this.#server.close((err) => {
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

            case 'update':
                this.#updateParameters(req, res);
                break;

            default:
                res.status(400).send();
        }
    };

    #listParameters = (req: express.Request, res: express.Response) => {
        const responseLines: string[] = [];

        const group = req.query.group as string;
        const names = group.split(',');

        for (const name of names) {
            const value = this.#parameters.get(name);

            if (value) {
                responseLines.push(`${name}=${value}`);
            } else {
                responseLines.push(`# Error: Error -1 getting param in group '${name}'`);
            }
        }

        res.setHeader('content-type', 'text/plain');
        res.send(responseLines.join('\r\n'));
    };

    #updateParameters = (req: express.Request, res: express.Response) => {
        const responseLines: string[] = [];

        for (const [name, value] of Object.entries(req.query)) {
            if (name === 'action') {
                continue;
            }

            if (this.#parameters.has(name)) {
                this.#parameters.set(name, value as string);
            } else {
                responseLines.push(`# Error: Error setting '${name}' to '${value}'!\r\n`);
            }
        }

        res.setHeader('content-type', 'text/plain');
        res.send(responseLines.length === 0 ? 'OK' : responseLines.join('\r\n'));
    };

    #pwdgrpHandler = (req: express.Request, res: express.Response) => {
        switch (req.query.action) {
            case 'add':
                this.#addUser(req, res);
                break;

            case 'update':
                this.#updateUser(req, res);
                break;

            case 'remove':
                this.#removeUser(req, res);
                break;

            case 'get':
                this.#getUsers(req, res);
                break;

            default:
                res.status(400).send();
        }
    };

    #addUser = (req: express.Request, res: express.Response) => {
        const user = req.query.user as string;

        res.setHeader('content-type', 'text/html');

        if (this.#users.has(user)) {
            res.send(Generate.html('Error: this user name already exists, consult the system log file'));
        } else {
            res.send(Generate.html(`Created account ${user}.`));
        }
    };

    #updateUser = (req: express.Request, res: express.Response) => {
        const user = req.query.user as string;

        res.setHeader('content-type', 'text/html');

        if (this.#users.has(user)) {
            res.send(Generate.html(`Modified account ${user}.`));
        } else {
            res.send(Generate.html('Error: consult the system log file.'));
        }
    };

    #removeUser = (req: express.Request, res: express.Response) => {
        const user = req.query.user as string;

        res.setHeader('content-type', 'text/html');

        if (this.#users.has(user)) {
            res.send(Generate.html(`Removed account ${user}.`));
        } else {
            res.send(Generate.html('Error: consult the system log file.'));
        }
    };

    #getUsers = (_: express.Request, res: express.Response) => {
        res.setHeader('content-type', 'text/plain');

        res.send(`root=""
daemon=""
bin=""
sys=""
adm=""
tty="scheduled,imaged,ptzadm"
disk="actionengined,streamer,tampering,motion,optics,imaged,ptzadm,focus,light"
lp=""
mail=""
news=""
uucp=""
man=""
proxy=""
kmem=""
input=""
dialout=""
fax=""
voice=""
cdrom=""
floppy=""
tape=""
sudo=""
audio="streamer,mediaclip,audiocontrol,mediaclipcgi,audio-equalizer,sdk"
dip=""
www-data=""
backup=""
list=""
irc=""
src=""
gnats=""
shadow="www,streamer"
utmp="streamer"
video="ptod,remote-syslogd,viewarea,light,vision-devices,sdk,inertiald,focus,xved,streamer,mord,larod,tampering,optics,vdn,imaged,maskd,lens_correctiond,video-object-detection,rotation,ptzadm,motion,wwwaovp,posd,vdo,overlay,videoapi"
sasl=""
plugdev=""
kvm=""
staff=""
games=""
shutdown=""
users="admin,adminptz,operator,operatorptz,viewer,viewerptz"
admin="wwwaop,wwwaov,wwwap,wwwav,wwwa,wwwao,sdk,wwwaovp,root,wwwavp,admin,adminptz"
operator="wwwovp,wwwaop,wwwaov,wwwop,wwwo,wwwov,wwwao,sdk,wwwaovp,root,admin,adminptz,operator,operatorptz"
viewer="root,wwwovp,wwwaov,wwwv,wwwov,wwwav,wwwavp,sdk,wwwaovp,wwwvp,admin,adminptz,operator,operatorptz,viewer,viewerptz"
ptz="wwwovp,wwwaop,wwwp,wwwop,wwwap,root,wwwavp,wwwaovp,wwwvp,adminptz,operatorptz,viewerptz"
anonymous=""
template="environment,ptzadm"
crypto="www,stclient"
gpio="streamer,actionengined,posd,iod,led,vdo,imaged,environment,scheduled,focus,light,ptzadm"
tpm="wwwaovp,www,streamer,mqtt-client,stclient"
compute="larod"
videohw="vdo,xved,imaged"
www="storage"
messagebus=""
focus=""
buzzer="focus"
sdk="sdk"
wsd="scheduled,wsdd"
sessioncgi="sessioncgi"
pwauth="www"
streamer="www,storage,sdk"
event="event,actionengined,streamer,triggerd"
storage="wwwaovp,actionengined,streamer,sdk,wsd"
wsauth="scheduled,streamer,wsd"
cert="actionengined,wwwaop,wwwaov,streamer,wwwap,wwwav,wwwa,wwwao,wwwavp,wsd,wwwaovp"
actionengined="wwwaovp"
iiodevices="posd,actionengined,ptzadm"
stclient=""
sshd=""
upnp=""
rendezvous=""
led="led"
ptod="ptod"
environment="environment"
virtualinputd="virtualinputd"
depd="depd"
eventbridged="eventbridged"
scheduled=""
imaged="maskd"
triggerd=""
motion=""
tampering=""
ptzadm="sdk"
wsdd=""
systemd-journal="systemlog"
iod=""
maskd=""
gtourd=""
light=""
power="power"
snmpd=""
confcached=""
posd=""
ruleengined=""
metadata="streamer"
audioapi=""
videoapi=""
tracing=""
legacymappings="led,audiocontrol,iod,mediaclip,videoapi,imaged,ptzadm,maskd"
systemd-bus-proxy=""
confloggerd="confloggerd"
netd=""
service_registry="mediaclip,iod,audiocontrol,ptzadm"
addon=""
vdo=""
overlay="vdo,videostreamingindicator,dynamic_overlayd,maskd,streamer"
gpu="overlay,larod,sdk,mord"
lldpd=""
eventproducerd="eventproducerd"
video-scene-manager=""
eventconsumerd="eventconsumerd"
dynamic_overlayd=""
capturemoded=""
vision-devices=""
vdn=""
audio-site=""
product-info=""
geolocationd="geolocationd"
systemmanager=""
diskmanager=""
ntp=""
storage-stability-helper="storage-stability-helper"
addonmanagerconf="addonmanagerconf"
video-service-legacy=""
licensekey-manager="licensekey-manager"
httpwdd="httpwdd"
ntpconfd=""
basic-device-info=""
mord=""
optics="actionengined,imaged,light"
audiocontrol=""
netservicesd=""
addonexample="addonexample"
onscreencontrols=""
systemlog=""
api-discovery=""
video-object-detection=""
larod=""
videostreamingindicator=""
time-service=""
xved=""
device-monitor=""
viewarea=""
mediaclip="mediaclip"
inertiald="inertiald"
mqtt-client="wwwaovp"
remote-syslogd="remote-syslogd"
netd-socket="actionengined,netd,wsd"
mdns-sd-confd=""
ssh-confd=""
rotation=""
audio-equalizer=""
streamcontrol=""
nogroup=""
digusers="root,admin,adminptz,operator,operatorptz,viewer,viewerptz"`);
    };
}
