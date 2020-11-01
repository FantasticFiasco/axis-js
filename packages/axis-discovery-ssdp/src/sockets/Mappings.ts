import { Device } from '..';
import { Message } from './Message';

/**
 * Maps a SSDP message to a device.
 */
export function mapFromMessage(message: Message): Device | null {
    const macAddressMatch = macAddressRegExp.exec(message.usn);
    if (macAddressMatch == null) {
        return null;
    }

    const macAddress = macAddressMatch[1].toUpperCase();

    return new Device(message.remoteAddress, undefined, macAddress, undefined, undefined, undefined, undefined, undefined);
}

const macAddressRegExp = /^uuid:.*([0-9a-f]{12})::.*$/i;
