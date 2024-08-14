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
    type = 'axis-video';
    subtypes: string[] = [];
    protocol = 'tcp';
    port: number;
    published = true;

    get fqdn(): string {
        return `${this.name}._axis-video._tcp.local'`;
    }

    get host(): string {
        if (!this.macAddress) {
            throw new Error('Mock service was created without any MAC address');
        }

        return `axis-${this.macAddress.toLowerCase()}.local`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    get txt(): object {
        if (this.macAddress) {
            return {
                macaddress: this.macAddress,
            };
        }

        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
    stop(_: () => any): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    start(): void {}
}
