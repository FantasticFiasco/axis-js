import * as expect from '@fantasticfiasco/expect';
import got from 'got';
import { IHttpClient } from './IHttpClient';

export class HttpClient implements IHttpClient {
    public async get(url: string): Promise<string> {
        expect.toExist(url);

        const res = await got.get(url);
        return res.body;
    }
}
