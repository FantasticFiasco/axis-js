import * as expect from '@fantasticfiasco/expect';
import { get } from 'request';
import { IHttpClient } from './IHttpClient';

export class HttpClient implements IHttpClient {
    public get(url: string): Promise<string> {
        expect.toExist(url);

        return new Promise<string>((resolve, reject) => {
            get(url, undefined, (error: any, _, body: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }
}
