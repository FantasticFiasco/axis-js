import { Connection, Protocol } from 'axis-core';
import * as fs from 'fs';
import { promisify } from 'util';
import { Snapshot } from '../src';

const writeFile = promisify(fs.writeFile);

(async () => {
    const connection = new Connection(Protocol.Http, '<ip address>', 80, 'root', '<password>');
    const snapshot = new Snapshot(connection);

    const image = await snapshot.jpeg({
        compression: 20,
        rotation: 180,
    });

    await writeFile('snapshot.jpeg', image);
})();
