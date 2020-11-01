import { Connection, Protocol, Snapshot } from 'axis-snapshot';
import * as fs from 'fs';
import { promisify } from 'util';

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
