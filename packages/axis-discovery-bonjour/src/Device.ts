/**
 * Class describing a device on the network.
 */
export class Device {
    /**
     * Initializes a new instance of the class.
     * @param address The address.
     * @param linkLocalAddress The link local address.
     * For more information regarding link local addresses, please see
     * [Wikipedia]{@link https://wikipedia.org/wiki/Link-local_address}.
     * @param port The port.
     * @param macAddress The MAC address. In most situations this is identical
     * to the serial number. The exceptions are the Axis products which bundle
     * multiple physical devices into a single casing with a shared network
     * interface. Because of the shared network interface they also share the
     * same MAC address.
     * @param friendlyName The short description for the end user.
     */
    constructor(
        /**
         * Gets the address.
         */
        readonly address: string,

        /**
         * Gets the link local address.
         * For more information regarding link local addresses, please see
         * [Wikipedia]{@link https://wikipedia.org/wiki/Link-local_address}.
         */
        readonly linkLocalAddress: string,

        /**
         * Gets the port.
         */
        readonly port: number,

        /**
         * Gets the MAC address. In most situations this is identical to the
         * serial number. The exceptions are the Axis products which bundle
         * multiple physical devices into a single casing with a shared network
         * interface. Because of the shared network interface they also share
         * the same MAC address.
         */
        readonly macAddress: string,

        /**
         * Gets the short description for the end user.
         */
        readonly friendlyName: string,
    ) {}
}
