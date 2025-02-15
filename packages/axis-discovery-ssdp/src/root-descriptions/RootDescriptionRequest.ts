import { log } from '../logging';
import { IHttpClient } from '../options';
import { RootDescription } from './RootDescription';

export class RootDescriptionRequest {
    constructor(
        private readonly remoteAddress: string,
        private readonly location: string,
        private readonly httpClient: IHttpClient,
    ) {}

    public async send(): Promise<RootDescription> {
        log('RootDescriptionRequest#send - %s', this.remoteAddress);

        const res = await this.httpClient.get(this.location);
        const text = await res.text();

        return RootDescription.parse(this.remoteAddress, text);
    }
}
