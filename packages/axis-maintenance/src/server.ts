import { Connection, FactoryDefaultType, Maintenance, Protocol } from './';

const connection = new Connection(Protocol.Http, '192.168.1.102', 80, 'root', '32naJzkJdZ!7*HK&Dz');
const maintenance = new Maintenance(connection);

// Restart
maintenance
    .restart()
    .then(() => console.log('Camera accepted request to restart'))
    .catch((error) => console.error(error));

// Partial factory default
maintenance
    .factoryDefault(FactoryDefaultType.Partial)
    .then(() => console.log('Camera accepted request to factory default'))
    .catch((error) => console.error(error));

// Hard factory default
maintenance
    .factoryDefault(FactoryDefaultType.Hard)
    .then(() => console.log('Camera accepted request to factory default'))
    .catch((error) => console.error(error));
