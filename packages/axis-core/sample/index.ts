import { Connection, DeviceRequest, Protocol, fetchBuilder } from '../src';

const address = process.env.DEVICE_IP ?? '192.168.0.90';
const port = Number.parseInt(process.env.DEVICE_PORT ?? '80');
const username = process.env.DEVICE_USERNAME ?? 'root';
const password = process.env.DEVICE_PASSWORD ?? 'pass';

const fetch = fetchBuilder(globalThis.fetch);

class GetProdShortNameRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection, '/axis-cgi/param.cgi?action=list&group=Brand.ProdShortName');
    }
}

const responseHandler = async (res: Response): Promise<{ name: string; value: string }> => {
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (contentType !== 'text/plain') {
        throw new Error(`Response with invalid content type: ${contentType}`);
    }

    const text = await res.text();
    const [name, value] = text.trim().split('=');

    return { name, value };
};

(async () => {
    const connection = new Connection(Protocol.Http, address, port, username, password);

    const req = new GetProdShortNameRequest(connection);
    const res = await fetch(req);

    const { name, value } = await responseHandler(res);

    console.log(`Status:     ${res.status}`);
    console.log(`Parameter:  ${name}=${value}`);
})();
