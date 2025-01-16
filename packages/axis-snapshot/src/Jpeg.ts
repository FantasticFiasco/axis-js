import { Connection, DeviceRequest } from 'axis-core';
import { SnapshotOptions } from './SnapshotOptions';
import { toQueryString } from './convert';

export class JpegRequest extends DeviceRequest {
    constructor(connection: Connection, options?: SnapshotOptions) {
        let relativePath = '/axis-cgi/jpg/image.cgi';

        const queryString = toQueryString(options);
        if (queryString !== null) {
            relativePath += '?' + queryString;
        }

        super(connection, relativePath);
    }
}

export const handleJpeg = async (res: Response): Promise<Buffer> => {
    if (!res.ok) {
        throw new Error(`Failed to handle jpeg response: ${res.status} ${res.statusText}`);
    }

    // image/bitmap
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'image/jpeg') {
        throw new Error(`Failed to handle jpeg response, invalid content type: ${contentType}`);
    }

    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
};
