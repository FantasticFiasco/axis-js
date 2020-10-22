import { Connection, Protocol } from './';
import * as parametersSample from './sample-parameters';
import * as usersSample from './sample-users';

const connection = new Connection(Protocol.Http, '192.168.1.102', 80, 'admin', '32naJzkJdZ!7*HK&Dz');

parametersSample.run(connection).then(() => usersSample.run(connection));
