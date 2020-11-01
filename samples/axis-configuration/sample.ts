import { Connection, Protocol } from 'axis-configuration';
import * as parametersSample from './parameters';
import * as usersSample from './users';

const connection = new Connection(Protocol.Http, '192.168.1.102', 80, 'admin', '32naJzkJdZ!7*HK&Dz');

parametersSample.run(connection).then(() => usersSample.run(connection));
