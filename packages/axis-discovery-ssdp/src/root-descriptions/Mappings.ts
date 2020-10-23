import { Device } from './..';
import { RootDescription } from './../root-descriptions/RootDescription';

/**
 * Maps a root description to a device.
 */
export function mapFromRootDescription(rootDescription: RootDescription): Device | null {
    if (rootDescription.macAddress === undefined) {
        return null;
    }

    return new Device(
        rootDescription.remoteAddress,
        parsePortFromPresentationUrl(rootDescription.presentationUrl),
        rootDescription.macAddress,
        rootDescription.friendlyName,
        rootDescription.modelName,
        rootDescription.modelDescription,
        rootDescription.modelNumber,
        rootDescription.presentationUrl
    );
}

const portFromPresentationUrlRegExp = /:(\d+)\/?$/i;

function parsePortFromPresentationUrl(presentationUrl: string | undefined): number | undefined {
    if (presentationUrl === undefined) {
        return undefined;
    }

    const portMatch = portFromPresentationUrlRegExp.exec(presentationUrl);
    if (portMatch == null) {
        return undefined;
    }

    return Number(portMatch[1]);
}
