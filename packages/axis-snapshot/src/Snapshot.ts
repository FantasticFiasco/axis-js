import { Connection, fetchBuilder } from 'axis-core';
import { BmpRequest, handleBmp } from './Bmp';
import { handleJpeg, JpegRequest } from './Jpeg';
import { SnapshotOptions } from './SnapshotOptions';

const fetch = fetchBuilder(global.fetch);

/**
 * Class responsible for getting snapshots from a camera.
 */
export class Snapshot {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * Takes a {link https://wikipedia.org/wiki/BMP_file_format|BMP} snapshot from the camera.
     * @param options The BMP snapshot options.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    public async bmp(options?: SnapshotOptions, init?: RequestInit): Promise<Buffer> {
        const req = new BmpRequest(this.connection, options);
        const res = await fetch(req, init);

        const blob = await handleBmp(res);
        return blob;
    }

    /**
     * Takes a {link https://en.wikipedia.org/wiki/JPEG|JPEG} snapshot from the camera.
     * @param options The Jpeg snapshot options.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    public async jpeg(options?: SnapshotOptions, init?: RequestInit): Promise<Buffer> {
        const req = new JpegRequest(this.connection, options);
        const res = await fetch(req, init);

        const blob = await handleJpeg(res);
        return blob;
    }
}
