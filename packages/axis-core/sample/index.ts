import { Connection, get, Protocol } from '../src';

const address = process.env.DEVICE_IP ?? '192.168.0.90';
const username = process.env.DEVICE_USERNAME ?? 'root';
const password = process.env.DEVICE_PASSWORD ?? 'pass';

(async () => {
    const connection = new Connection(Protocol.Http, address, 80, username, password);

    const res: Response = await get(connection, '/axis-cgi/param.cgi?action=list&group=Brand.ProdShortName');
    const body = await res.text();

    console.log('Status:', res.status);
    console.log('Headers:', res.headers);
    console.log('Body:', body);
})();
