import { Connection, DeviceRequest } from 'axis-core';
import * as cheerio from 'cheerio';
import { FactoryDefaultType } from './FactoryDefaultType';

export class FactoryDefaultRequest extends DeviceRequest {
    constructor(connection: Connection, type: FactoryDefaultType) {
        const relativePath = type === FactoryDefaultType.Partial ? '/axis-cgi/factorydefault.cgi' : '/axis-cgi/hardfactorydefault.cgi';

        super(connection, relativePath);
    }
}

export const handleFactoryDefault = async (res: Response, type: FactoryDefaultType): Promise<void> => {
    if (!res.ok) {
        throw new Error(`Failed to handle factory default response: ${res.status} ${res.statusText}`);
    }

    // text/html;charset=UTF-8
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'text/html') {
        throw new Error(`Failed to handle factory default response, invalid content type: ${contentType}`);
    }

    const text = await res.text();
    const document = cheerio.load(text);
    const head = document.html('head');

    if (!head) {
        throw new Error('Failed to handle factory default response, no HTML in response head');
    }

    if (type === FactoryDefaultType.Partial) {
        if (!SUCCESS_RESPONSE_PARTIAL_TYPE.test(head)) {
            throw new Error(`Failed to handle factory default response: ${head}`);
        }
    } else {
        if (!SUCCESS_RESPONSE_HARD_TYPE.test(head)) {
            throw new Error(`Failed to handle factory default response: ${head}`);
        }
    }
};

const SUCCESS_RESPONSE_PARTIAL_TYPE = /factoryMessage/i;
const SUCCESS_RESPONSE_HARD_TYPE = /factoryMessage2/i;
