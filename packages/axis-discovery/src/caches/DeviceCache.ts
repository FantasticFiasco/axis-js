import * as expect from '@fantasticfiasco/expect';
import { Device } from '../Device';
import { log } from '../logging';

export class DeviceCache {
    constructor(...devices: Device[]) {
        for (const device of devices) {
            this.devices[device.macAddress] = device;
        }
    }

    private readonly devices: { [macAddress: string]: Device } = {};

    public update(device: Device): Device {
        expect.toExist(device.macAddress, `MAC address of device with address ${device.address} is expected`);

        let hit = this.devices[device.macAddress];

        if (hit) {
            log('DeviceCache#update - hit for %s [%s]', device.address, device.macAddress);
            hit = Object.assign(hit, device);
        } else {
            log('DeviceCache#update - miss for %s [%s]', device.address, device.macAddress);
            hit = device;
        }

        this.devices[device.macAddress] = hit;
        return hit;
    }
}
