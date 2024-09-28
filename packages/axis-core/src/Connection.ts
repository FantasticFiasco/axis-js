import * as http from 'http';
import * as https from 'https';
import { Protocol } from './Protocol';

/**
 * Interface describing options for a connection.
 */
export interface Options {
    /**
     * The HTTP or HTTPS agent used when opening the connection.
     */
    agent?: http.Agent | https.Agent;
}

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
     * @param options The options for the connection to the device.
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
        /**
         * Gets the options for the connection to the device.
         */
        public readonly options?: Options,
    ) {}

    /**
     * Gets the url.
     */
    get url(): string {
        return `${this.protocol === Protocol.Http ? 'http' : 'https'}://${this.address}:${this.port}`;
    }
}
