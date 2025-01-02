import { Connection, DeviceRequest, Protocol } from '../src';

const address = process.env.DEVICE_IP ?? '192.168.0.90';
const port = Number.parseInt(process.env.DEVICE_PORT ?? '80');
const username = process.env.DEVICE_USERNAME ?? 'root';
const password = process.env.DEVICE_PASSWORD ?? 'pass';

class GetProdShortNameRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection, fetch);
    }

    public async send(): Promise<Response> {
        const res = await this._get('/axis-cgi/param.cgi?action=list&group=Brand.ProdShortName');
        return res;
    }
}

(async () => {
    const connection = new Connection(Protocol.Http, address, port, username, password);
    const req = new GetProdShortNameRequest(connection);

    const res = await req.send();
    const body = await res.text();

    console.log('Status: ', res.status);
    console.log('Body:   ', body);
})();
