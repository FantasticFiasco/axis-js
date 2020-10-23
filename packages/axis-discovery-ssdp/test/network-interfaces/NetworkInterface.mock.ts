import { NetworkInterfaceInfoIPv4, NetworkInterfaceInfoIPv6 } from 'os';

export const NETWORK_INTERFACE_WITH_TWO_ADDRESSES: { [index: string]: NetworkInterfaceInfoIPv4[] } = {
    Ethernet: [
        { address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false, cidr: '1.1.1.1/8' },
        { address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false, cidr: '2.2.2.2/8' },
    ],
};

export const NETWORK_INTERFACES_WITH_TWO_ADDRESSES: { [index: string]: NetworkInterfaceInfoIPv4[] } = {
    Ethernet1: [{ address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false, cidr: '1.1.1.1/8' }],
    Ethernet2: [{ address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: false, cidr: '2.2.2.2/8' }],
};

export const NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES: { [index: string]: NetworkInterfaceInfoIPv4[] } = {
    Ethernet1: [{ address: '1.1.1.1', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: true, cidr: '1.1.1.1/8' }],
    Ethernet2: [{ address: '2.2.2.2', netmask: '255.0.0.0', family: 'IPv4', mac: '11:11:11:11:11:11', internal: true, cidr: '2.2.2.2/8' }],
};

export const NETWORK_INTERFACES_WITH_IPV6_ADDRESSES: { [index: string]: NetworkInterfaceInfoIPv6[] } = {
    Ethernet1: [
        {
            address: '1111::1111:1111:1111:1111',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '11:11:11:11:11:11',
            scopeid: 6,
            internal: false,
            cidr: '1111::1111:1111:1111:1111/64',
        },
    ],
    Ethernet2: [
        {
            address: '2222::2222:2222:2222:2222',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '22:22:22:22:22:22',
            scopeid: 6,
            internal: false,
            cidr: '2222::2222:2222:2222:2222/64',
        },
    ],
};

export const NO_NETWORK_INTERFACES = {};
