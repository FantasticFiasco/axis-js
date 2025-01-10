import { Connection } from './Connection';

/**
 * Abstract class describing a HTTP(S) request sent to an Axis device.
 */
export abstract class DeviceRequest extends Request {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     * @param relativePath The relative path.
     * @param options The object containing any custom settings that you want to apply to the request.
     */
    protected constructor(connection: Connection, relativePath: string, options?: RequestInit) {
        super(connection.url + relativePath, options);

        this.username = connection.username;
        this.password = connection.password;
    }

    /**
     * Gets the username.
     */
    public readonly username: string;

    /**
     * Gets the password.
     */
    public readonly password: string;
}
