import { Connection, DeviceRequest } from 'axis-core';

export class RestartRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection, '/axis-cgi/restart.cgi');
    }
}

export const handleRestart = async (res: Response): Promise<void> => {
    if (!res.ok) {
        throw new Error(`Failed to handle restart response: ${res.status} ${res.statusText}`);
    }

    // text/html;charset=UTF-8
    const contentType = res.headers.get('content-type')?.split(';')[0];
    if (contentType !== 'text/html') {
        throw new Error(`Failed to handle restart response, invalid content type: ${contentType}`);
    }

    const text = await res.text();

    if (!SUCCESS_RESPONSE.test(text)) {
        throw new Error(`Failed to handle restart response: ${text}`);
    }
};

const SUCCESS_RESPONSE = /restartMessage/i;
