import { Connection } from './Connection';
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
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    public async bmp(options?: SnapshotOptions): Promise<Buffer> {
        const request = new BmpRequest(this.connection, options);
        const response = await request.send();

        return response;
    }

    /**
     * Takes a {link https://en.wikipedia.org/wiki/JPEG|JPEG} snapshot from the camera.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     */
    public async jpeg(options?: SnapshotOptions): Promise<Buffer> {
        const request = new JpegRequest(this.connection, options);
        const response = await request.send();

        return response;
    }
}
