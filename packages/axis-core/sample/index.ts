import { Connection, DeviceRequest, Protocol, fetchBuilder } from '../src';

const address = process.env.DEVICE_IP ?? '192.168.0.90';
const port = Number.parseInt(process.env.DEVICE_PORT ?? '80');
const username = process.env.DEVICE_USERNAME ?? 'root';
const password = process.env.DEVICE_PASSWORD ?? 'pass';

// fetchBuilder is building a version of fetch that can handle the
// authentication protocols used by Axis devices.
const fetch = fetchBuilder(global.fetch);

// This package is exporting utility classes and methods. In this case we rely
// on DeviceRequest to build a request that is reading the product short name.
class GetProdShortNameRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection, '/axis-cgi/param.cgi?action=list&group=Brand.ProdShortName');
    }
}

// This is a custom response handler that reads the response body and extracts
// the parameter name and value from the text.
const responseHandler = async (res: Response): Promise<{ name: string; value: string }> => {
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status} ${res.statusText}`);
    }

    // text/plain;charset=UTF-8
    const contentType = res.headers.get('content-type')?.split(';')[0];
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
