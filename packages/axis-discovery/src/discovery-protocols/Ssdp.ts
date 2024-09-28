import * as ssdp from 'axis-discovery-ssdp';
import { Device } from '..';
import { log } from '../logging';
import { IDiscoveryProtocol } from './IDiscoveryProtocol';

export class Ssdp implements IDiscoveryProtocol {
    private readonly discovery: ssdp.Discovery;

    constructor() {
        this.discovery = new ssdp.Discovery();
    }

    public async start(): Promise<void> {
        try {
            await this.discovery.start();
        } catch (error) {
            log('Ssdp#start - unable to start discovery %o', error);
            throw error;
        }
    }

    public async stop(): Promise<void> {
        try {
            await this.discovery.stop();
        } catch (error) {
            log('Ssdp#stop - unable to stop discovery %o', error);
            throw error;
        }
    }

    public async search(): Promise<void> {
        try {
            await this.discovery.search();
        } catch (error) {
            log('Ssdp#search - unable to search %o', error);
            throw error;
        }
    }

    public onHello(callback: (device: Device) => void): void {
        this.discovery.on('hello', (ssdpDevice: ssdp.Device) => {
            const device = this.mapToDevice(ssdpDevice);
            if (device) {
                callback(device);
            } else {
                log('Ssdp#onHello - unable to map %o', ssdpDevice);
            }
        });
    }

    public onGoodbye(callback: (device: Device) => void): void {
        this.discovery.on('goodbye', (ssdpDevice: ssdp.Device) => {
            const device = this.mapToDevice(ssdpDevice);
            if (device) {
                callback(device);
            } else {
                log('Ssdp#onGoodbye - unable to map %o', ssdpDevice);
            }
        });
    }

    private mapToDevice(ssdpDevice: ssdp.Device): Device | undefined {
        if (!ssdpDevice.macAddress) {
            return undefined;
        }

        return new Device(
            ssdpDevice.address,
            undefined,
            ssdpDevice.port,
            ssdpDevice.macAddress,
            ssdpDevice.friendlyName,
            ssdpDevice.modelName,
            ssdpDevice.modelDescription,
            ssdpDevice.modelNumber,
            ssdpDevice.presentationURL,
        );
    }
}
