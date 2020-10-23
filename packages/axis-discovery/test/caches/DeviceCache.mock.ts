import { Device } from './../../src';

export const DEVICE_WITH_INFORMATION = new Device(
    '192.168.1.102',
    '169.254.1.1',
    80,
    'ACCC8E270AD8',
    'Lobby',
    'AXIS M1014',
    'AXIS M1014 Fixed Network Camera',
    'M1014',
    'http://192.168.1.102:80'
);

export const DEVICE_WITHOUT_INFORMATION = new Device(
    '192.168.1.102',
    undefined,
    undefined,
    'ACCC8E270AD8',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
);

export const DEVICE_WITHOUT_MAC_ADDRESS = new Device('192.168.1.102', undefined, undefined, '', undefined, undefined, undefined, undefined, undefined);
