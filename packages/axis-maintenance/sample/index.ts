import { Connection, FactoryDefaultType, Maintenance, Protocol } from '../src';

const address = process.env.DEVICE_IP ?? '192.168.0.90';
const port = Number.parseInt(process.env.DEVICE_PORT ?? '80');
const username = process.env.DEVICE_USERNAME ?? 'root';
const password = process.env.DEVICE_PASSWORD ?? 'pass';

(async () => {
    const connection = new Connection(Protocol.Http, address, port, username, password);
    const maintenance = new Maintenance(connection);

    // Restart
    await maintenance.restart();
    console.log('Camera accepted request to restart');

    // Partial factory default
    await maintenance.factoryDefault(FactoryDefaultType.Partial);
    console.log('Camera accepted request to factory default');

    // Hard factory default
    await maintenance.factoryDefault(FactoryDefaultType.Hard);
    console.log('Camera accepted request to factory default');
})();
