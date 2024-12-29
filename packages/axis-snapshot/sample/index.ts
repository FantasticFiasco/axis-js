import { Connection, Protocol } from 'axis-core';
import * as fs from 'fs';
import { promisify } from 'util';
import { Snapshot } from '../src';

const writeFile = promisify(fs.writeFile);

const address = process.env.DEVICE_IP ?? '192.168.0.90';
const username = process.env.DEVICE_USERNAME ?? 'root';
const password = process.env.DEVICE_PASSWORD ?? 'pass';

(async () => {
    const connection = new Connection(Protocol.Http, address, 80, username, password);
    const snapshot = new Snapshot(connection);

    const image = await snapshot.jpeg({
        compression: 20,
        rotation: 180,
    });

    await writeFile('snapshot.jpeg', image);
})();
