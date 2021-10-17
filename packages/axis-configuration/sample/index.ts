import { Connection, Protocol } from '../src';
import * as parameters from './parameters';
import * as users from './users';

(async () => {
    const connection = new Connection(Protocol.Http, '<ip address>', 80, 'root', '<password>');

    await parameters.run(connection);
    await users.run(connection);
})();
