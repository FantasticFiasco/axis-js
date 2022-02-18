import { Connection, Protocol } from 'axis-core';
import { FactoryDefaultType, Maintenance } from '../src';

(async () => {
    const connection = new Connection(Protocol.Http, '<ip address>', 80, 'root', '<password>');
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
