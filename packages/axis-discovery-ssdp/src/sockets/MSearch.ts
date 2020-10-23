/**
 * Class describing the wish to discover available services on a network. A
 * response to such search request is sent via unicast addressing to the
 * originating address and port number of the multicast request.
 */
export class MSearch {
    /**
     * The M-SEARCH payload for searching for Axis devices on the network.
     */
    private static Payload =
        'M-SEARCH * HTTP/1.1\r\n' +
        'Host:239.255.255.250:1900\r\n' +
        'ST:urn:axis-com:service:BasicService:1\r\n' +
        'Man:"ssdp:discover"\r\n' +
        'MX:3\r\n' +
        '\r\n';

    /**
     * Converts the M-SEARCH request into a buffer.
     */
    public toBuffer(): Buffer {
        return Buffer.from(MSearch.Payload);
    }
}
