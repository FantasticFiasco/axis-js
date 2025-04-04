import { Connection, Protocol } from '../src';
import * as parameters from './parameters';
import * as users from './users';

const address = process.env.DEVICE_IP ?? '192.168.0.90';
const port = Number.parseInt(process.env.DEVICE_PORT ?? '80');
const username = process.env.DEVICE_USERNAME ?? 'root';
const password = process.env.DEVICE_PASSWORD ?? 'pass';

(async () => {
    const connection = new Connection(Protocol.Http, address, port, username, password);

    await parameters.run(connection);
    await users.run(connection);
})();
