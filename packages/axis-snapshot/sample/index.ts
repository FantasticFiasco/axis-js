import { writeFile } from 'fs/promises';
import { Connection, Protocol, Snapshot } from '../src';

const address = process.env.DEVICE_IP ?? '192.168.0.90';
const port = Number.parseInt(process.env.DEVICE_PORT ?? '80');
const username = process.env.DEVICE_USERNAME ?? 'root';
const password = process.env.DEVICE_PASSWORD ?? 'pass';

(async () => {
    const connection = new Connection(Protocol.Http, address, port, username, password);
    const snapshot = new Snapshot(connection);

    const image = await snapshot.jpeg({
        compression: 20,
        rotation: 180,
    });

    await writeFile('snapshot.jpeg', image);
})();
