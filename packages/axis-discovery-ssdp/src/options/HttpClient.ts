import * as expect from '@fantasticfiasco/expect';
import { IHttpClient } from './IHttpClient';

export class HttpClient implements IHttpClient {
    public async get(url: string): Promise<Response> {
        expect.toExist(url);

        const res = await fetch(url);
        return res;
    }
}
