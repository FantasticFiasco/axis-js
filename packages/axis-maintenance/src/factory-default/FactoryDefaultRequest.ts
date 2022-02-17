import { Connection } from '..';
import { FactoryDefaultResponse } from './FactoryDefaultResponse';
import { FactoryDefaultType } from './FactoryDefaultType';

export class FactoryDefaultRequest extends DeviceRequest {
    constructor(connection: Connection, private readonly type: FactoryDefaultType) {
        super(connection);
    }

    public async send(): Promise<FactoryDefaultResponse> {
        const response = await this.get(this.url);

        return new FactoryDefaultResponse(response, this.type);
    }

    public get url(): string {
        return this.type === FactoryDefaultType.Partial
            ? `${this.connection.url}/axis-cgi/factorydefault.cgi`
            : `${this.connection.url}/axis-cgi/hardfactorydefault.cgi`;
    }
}
