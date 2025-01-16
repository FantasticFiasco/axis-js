import { Protocol } from './Protocol';

/**
 * Class describing a connection to a device.
 */
export class Connection {
    /**
     * Initializes a new instance of the class.
     * @param protocol The protocol to use when creating the connection.
     * @param address The address or hostname of the device.
     * @param port The port of the device.
     * @param username The username.
     * @param password The password.
     */
    constructor(
        /**
         * Gets the protocol to use when creating the connection.
         */
        public readonly protocol: Protocol,

        /**
         * Gets the address or hostname of the device.
         */
        public readonly address: string,

        /**
         * Gets the port of the device.
         */
        public readonly port: number,

        /**
         * Gets the username.
         */
        public readonly username: string,

        /**
         * Gets the password.
         */
        public readonly password: string,
    ) {}

    /**
     * Gets the url.
     */
    get url(): string {
        return `${this.protocol === Protocol.Http ? 'http' : 'https'}://${this.address}:${this.port}`;
    }
}
