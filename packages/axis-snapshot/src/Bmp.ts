import { Connection, DeviceRequest } from 'axis-core';
import { SnapshotOptions } from './SnapshotOptions';
import { toQueryString } from './convert';

export class BmpRequest extends DeviceRequest {
    constructor(connection: Connection, options?: SnapshotOptions) {
        let relativePath = '/axis-cgi/bitmap/image.bmp';

        const queryString = toQueryString(options);
        if (queryString !== null) {
            relativePath += '?' + queryString;
        }

        super(connection, relativePath);
    }
}

export const handleBmp = async (res: Response): Promise<Buffer> => {
    if (!res.ok) {
        throw new Error(`Failed to handle bmp response: ${res.status} ${res.statusText}`);
    }

    // image/bitmap
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'image/bitmap') {
        throw new Error(`Failed to handle bmp response, invalid content type: ${contentType}`);
    }

    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
};
