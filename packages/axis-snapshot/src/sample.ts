import { writeFileSync } from 'fs';
import { Connection, Protocol, Snapshot } from '.';

const connection = new Connection(Protocol.Http, '192.168.1.130', 80, 'root', '8l1QyDhbZGprv');
const snapshot = new Snapshot(connection);

snapshot.jpeg({ compression: 20, rotation: 180 }).then((image: Buffer) => writeFileSync('snapshot.jpeg', image));
