import { Connection, DeviceRequest } from 'axis-core';
import { FactoryDefaultResponse } from './FactoryDefaultResponse';
import { FactoryDefaultType } from './FactoryDefaultType';

export class FactoryDefaultRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly type: FactoryDefaultType,
    ) {
        super(connection);
    }

    public async send(): Promise<FactoryDefaultResponse> {
        const res = await this._get(this.relativePath);

        return new FactoryDefaultResponse(response.toString(), this.type);
    }

    public get relativePath(): string {
        return this.type === FactoryDefaultType.Partial ? '/axis-cgi/factorydefault.cgi' : '/axis-cgi/hardfactorydefault.cgi';
    }
}
