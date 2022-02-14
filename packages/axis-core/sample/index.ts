import { Connection, get, Protocol } from '../src';

(async () => {
    const connection = new Connection(Protocol.Http, '<ip address>', 80, 'root', '<password>');

    const res = await get(connection, '/axis-cgi/param.cgi?action=list&group=Brand.ProdShortName');

    console.log('Status code:', res.statusCode);
    console.log('Headers:', res.headers);
    console.log('Body:', res.body);
})();
