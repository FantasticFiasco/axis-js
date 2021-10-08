import * as debug from 'debug';

export function log(formatter: unknown, ...args: unknown[]): void {
    logger(formatter, ...args);
}

const logger = debug('axis-discovery');
