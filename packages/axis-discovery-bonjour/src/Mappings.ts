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

function getAddresses(service: any): string[] | undefined {
    if (!service.addresses || service.addresses instanceof Array === false) {
        return undefined;
    }

    for (const address of service.addresses) {
        if (typeof address !== 'string') {
            return undefined;
        }
    }

    return service.addresses;
}

function getAddress(addresses: string[]): string | undefined {
    return addresses.find((address) => !address.startsWith(linkLocalPrefix));
}

function getLinkLocalAddress(addresses: string[]): string | undefined {
    return addresses.find((address) => address.startsWith(linkLocalPrefix));
}

function getMacAddress(service: any): string | undefined {
    if (!service.txt || !service.txt.macaddress || typeof service.txt.macaddress !== 'string') {
        return undefined;
    }

    return service.txt.macaddress;
}
