import * as debug from 'debug';

export function log(formatter: any, ...args: any[]) {
    logger(formatter, ...args);
}

const logger = debug('axis-discovery-ssdp');
