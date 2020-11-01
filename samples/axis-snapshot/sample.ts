import { Connection, Protocol, Snapshot } from 'axis-snapshot';
import { writeFileSync } from 'fs';

(async () => {
    const connection = new Connection(Protocol.Http, '<ip address>', 80, 'root', '<password>');
    const snapshot = new Snapshot(connection);

    const image = await snapshot.jpeg({
        compression: 20,
        rotation: 180,
    });

    writeFileSync('snapshot.jpeg', image);
})();
