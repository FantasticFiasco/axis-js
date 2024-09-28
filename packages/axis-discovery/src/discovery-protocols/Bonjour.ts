import * as bonjour from 'axis-discovery-bonjour';
import { Device } from '../Device';
import { log } from '../logging';
import { IDiscoveryProtocol } from './IDiscoveryProtocol';

export class Bonjour implements IDiscoveryProtocol {
    private readonly discovery: bonjour.Discovery;

    constructor() {
        this.discovery = new bonjour.Discovery();
    }

    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.discovery.start();
                resolve();
            } catch (error) {
                log('Bonjour#start - unable to start discovery %o', error);
                reject(error);
            }
        });
    }

    public stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.discovery.stop();
                resolve();
            } catch (error) {
                log('Bonjour#stop - unable to stop discovery %o', error);
                reject(error);
            }
        });
    }

    public search(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.discovery.search();
                resolve();
            } catch (error) {
                log('Bonjour#search - unable to search %o', error);
                reject(error);
            }
        });
    }

    public onHello(callback: (device: Device) => void): void {
        this.discovery.on('hello', (bonjourDevice: bonjour.Device) => {
            const device = this.mapToDevice(bonjourDevice);
            callback(device);
        });
    }

    public onGoodbye(callback: (device: Device) => void): void {
        this.discovery.on('goodbye', (bonjourDevice: bonjour.Device) => {
            const device = this.mapToDevice(bonjourDevice);
            callback(device);
        });
    }

    private mapToDevice(bonjourDevice: bonjour.Device): Device {
        return new Device(
            bonjourDevice.address,
            bonjourDevice.linkLocalAddress,
            bonjourDevice.port,
            bonjourDevice.macAddress,
            bonjourDevice.friendlyName,
            undefined,
            undefined,
            undefined,
            undefined,
        );
    }
}
