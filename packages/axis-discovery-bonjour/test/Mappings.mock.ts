import * as events from 'events';
import * as bonjour from '../vendor/bonjour';

export class AxisService extends events.EventEmitter implements bonjour.Service {
    constructor(addresses: string[], name: string, port: number, macAddress: string | undefined) {
        super();

        this.addresses = addresses;
        this.name = name;
        this.port = port;
        this.macAddress = macAddress;
    }

    private macAddress: string | undefined;

    addresses: string[];
    name: string;
    type: string = 'axis-video';
    subtypes: string[] = [];
    protocol: string = 'tcp';
    port: number;
    published: boolean = true;

    get fqdn(): string {
        return `${this.name}._axis-video._tcp.local'`;
    }

    get host(): string {
        return `axis-${this.macAddress!.toLowerCase()}.local`;
    }

    get txt(): Object {
        if (this.macAddress) {
            return {
                macaddress: this.macAddress,
            };
        }

        return {};
    }

    stop(_: () => any): void {}
    start(): void {}
}
