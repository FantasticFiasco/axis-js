import * as bonjour from '../vendor/bonjour';
import { Device } from './Device';

/**
 * Maps from a Bonjour service to a device.
 */
export function mapFromService(service: bonjour.Service): Device | undefined {
    const addresses = getAddresses(service);
    if (!addresses) {
        return undefined;
    }

    const address = getAddress(addresses);
    if (!address) {
        return undefined;
    }

    const linkLocalAddress = getLinkLocalAddress(addresses);
    if (!linkLocalAddress) {
        return undefined;
    }

    const macAddress = getMacAddress(service);
    if (!macAddress) {
        return undefined;
    }

    return new Device(address, linkLocalAddress, service.port, macAddress.toUpperCase(), service.name);
}

const linkLocalPrefix = '169.254';

function getAddresses(service: unknown): string[] | undefined {
    const serviceWithAddresses = service as { addresses?: Array<undefined> };
    if (!serviceWithAddresses.addresses || serviceWithAddresses.addresses instanceof Array === false) {
        return undefined;
    }

    const addresses: string[] = [];

    for (const address of serviceWithAddresses.addresses) {
        if (typeof address !== 'string') {
            return undefined;
        }

        addresses.push(address);
    }

    return addresses;
}

function getAddress(addresses: string[]): string | undefined {
    return addresses.find((address) => !address.startsWith(linkLocalPrefix));
}

function getLinkLocalAddress(addresses: string[]): string | undefined {
    return addresses.find((address) => address.startsWith(linkLocalPrefix));
}

function getMacAddress(service: unknown): string | undefined {
    const serviceWithMacAddress = service as { txt?: { macaddress: unknown } };
    if (!serviceWithMacAddress.txt || !serviceWithMacAddress.txt.macaddress || typeof serviceWithMacAddress.txt.macaddress !== 'string') {
        return undefined;
    }

    return serviceWithMacAddress.txt.macaddress;
}
