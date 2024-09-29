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
        const response = await this.get(this.relativePath());

        return new FactoryDefaultResponse(response.toString(), this.type);
    }

    public relativePath(): string {
        return this.type === FactoryDefaultType.Partial ? '/axis-cgi/factorydefault.cgi' : '/axis-cgi/hardfactorydefault.cgi';
    }
}
