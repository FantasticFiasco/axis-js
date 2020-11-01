import { Connection, Protocol } from 'axis-configuration';
import * as parameters from './parameters';
import * as users from './users';

(async () => {
    const connection = new Connection(Protocol.Http, '192.168.1.102', 80, 'admin', '32naJzkJdZ!7*HK&Dz');

    await parameters.run(connection);
    await users.run(connection);
})();
