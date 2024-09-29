/**
 * Class describing a device on the network.
 */
export class Device {
    /**
     * Initializes a new instance of the class.
     * @param address The address.
     * @param port The port.
     * @param macAddress The MAC address. In most situations this is identical
     * to the serial number. The exceptions are the Axis products which bundle
     * multiple physical devices into a single casing with a shared network
     * interface. Because of the shared network interface they also share the
     * same MAC address.
     * @param friendlyName The short description for the end user.
     * @param modelName The model name.
     * @param modelDescription The long model description for the end user.
     * @param modelNumber The model number.
     * @param presentationURL The URL to the web page of the device.
     */
    constructor(
        /**
         * Gets the address.
         */
        readonly address: string,
        /**
         * Gets the port.
         */
        readonly port: number | undefined,
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
        readonly friendlyName: string | undefined,
        /**
         * Gets the model name.
         */
        readonly modelName: string | undefined,
        /**
         * Gets the long model description for the end user.
         */
        readonly modelDescription: string | undefined,
        /**
         * Gets the model number.
         */
        readonly modelNumber: string | undefined,
        /**
         * Gets the URL to the web page of the device.
         */
        readonly presentationURL: string | undefined,
    ) {}
}
