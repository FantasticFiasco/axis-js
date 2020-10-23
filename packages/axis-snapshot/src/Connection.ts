import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import { Protocol } from './Protocol';

/**
 * Interface describing options for a connection.
 */
export interface Options {
  /**
   * The HTTP or HTTPS agent used when opening the connection.
   */
  agent?: HttpAgent | HttpsAgent;
}

/**
 * Class describing a connection to a device.
 */
export class Connection {
  constructor(
    /**
     * The protocol to use when creating the connection.
     */
    public readonly protocol: Protocol,
    /**
     * The address or hostname of the device.
     */
    public readonly address: string,
    /**
     * The port of the device.
     */
    public readonly port: number,
    /**
     * The username.
     */
    public readonly username: string,
    /**
     * The password.
     */
    public readonly password: string,
    /**
     * The options for the connection to the device.
     */
    public readonly options?: Options
  ) {}

  /**
   * Gets the url.
   */
  get url(): string {
    return `${this.protocol === Protocol.Http ? 'http' : 'https'}://${this.address}:${this.port}`;
  }
}
