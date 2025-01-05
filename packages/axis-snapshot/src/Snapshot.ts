import { Connection } from 'axis-core';
import { BmpRequest } from './requests/BmpRequest';
import { JpegRequest } from './requests/JpegRequest';
import { SnapshotOptions } from './SnapshotOptions';

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
     */
    public async bmp(options?: SnapshotOptions): Promise<Buffer> {
        const req = new BmpRequest(this.connection, options);
        const res = await request.send();

        return response;
    }

    /**
     * Takes a {link https://en.wikipedia.org/wiki/JPEG|JPEG} snapshot from the camera.
     */
    public async jpeg(options?: SnapshotOptions): Promise<Buffer> {
        const req = new JpegRequest(this.connection, options);
        const res = await request.send();

        return response;
    }
}
