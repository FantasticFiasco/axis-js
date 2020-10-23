export const NOTIFY_MESSAGE_WITH_LOWERCASE_MACADDRESS =
    'NOTIFY * HTTP/1.1\r\n' +
    'HOST: 239.255.255.250:1900\r\n' +
    'CACHE-CONTROL: max-age=1800\r\n' +
    'LOCATION: http://192.168.1.102:45895/rootdesc1.xml\r\n' +
    'OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01\r\n' +
    '01-NLS: 2ae7b584-1dd2-11b2-988f-983991d749b2\r\n' +
    'NT: urn:axis-com:service:BasicService:1\r\n' +
    'NTS: ssdp:byebye\r\n' +
    'SERVER: Linux/2.6.35, UPnP/1.0, Portable SDK for UPnP devices/1.6.18\r\n' +
    'X-User-Agent: redsonic\r\n' +
    'USN: uuid:Upnp-BasicDevice-1_0-accc8e270ad8::urn:axis-com:service:BasicService:1\r\n';

export const MSEARCH_MESSAGE_WITH_LOWERCASE_MACADDRESS =
    'HTTP/1.1 200 OK\r\n' +
    'CACHE-CONTROL: max-age=1800\r\n' +
    'DATE: Sun, 02 Oct 2016 21:11:25 GMT\r\n' +
    'EXT:\r\n' +
    'LOCATION: http://192.168.1.102:45895/rootdesc1.xml\r\n' +
    'OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01\r\n' +
    '01-NLS: 8fb2638a-1dd2-11b2-a915-c89968cce2ca\r\n' +
    'SERVER: Linux/2.6.35, UPnP/1.0, Portable SDK for UPnP devices/1.6.18\r\n' +
    'X-User-Agent: redsonic\r\n' +
    'ST: urn:axis-com:service:BasicService:1\r\n' +
    'USN: uuid:Upnp-BasicDevice-1_0-accc8e270ad8::urn:axis-com:service:BasicService:1\r\n';
