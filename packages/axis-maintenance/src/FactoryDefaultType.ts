export enum FactoryDefaultType {
    /**
     * All settings, except the following, are set to their factory default values:
     *
     * - The boot protocol (Network.BootProto)
     * - The static IP address (Network.IPAddress)
     * - The default router (Network.DefaultRouter)
     * - The subnet mask (Network.SubnetMask)
     * - The broadcast IP address (Network.Broadcast)
     * - The system time
     * - The IEEE 802.1X settings
     *
     * Since these parameters are not reset the Axis product can be accessed on the same address.
     * This is especially important when using NAT router. After the Axis product has been reset to
     * factory default it is restarted as part of this function.
     */
    Partial,

    /**
     * All settings, including the IP addresses, are set to their factory default values. After the
     * Axis product has been reset to factory default it is restarted as part of this function.
     */
    Hard,
}
