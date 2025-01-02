import { DeviceResponse } from 'axis-core';
import { FactoryDefaultType } from './FactoryDefaultType';

export class FactoryDefaultResponse extends DeviceResponse {
    constructor(
        response: string,
        private readonly type: FactoryDefaultType,
    ) {
        super(response);
    }

    private static readonly SuccessResponsePartialType = /factoryMessage/i;
    private static readonly SuccessResponseHardType = /factoryMessage2/i;

    public assertSuccess(): void {
        if (this.type === FactoryDefaultType.Partial) {
            this.assertPartialTypeSuccess();
        } else {
            this.assertHardTypeSuccess();
        }
    }

    private assertPartialTypeSuccess() {
        if (FactoryDefaultResponse.SuccessResponsePartialType.test(this.response)) {
            return;
        }

        this.throwError();
    }

    private assertHardTypeSuccess() {
        if (FactoryDefaultResponse.SuccessResponseHardType.test(this.response)) {
            return;
        }

        this.throwError();
    }

    private throwError() {
        let body: string | null = this.body;

        if (body !== null) {
            body = body.trim();
            if (body) {
                throw new Error(body);
            }
        }

        throw new Error('Request to reset device to factory default was not successful');
    }
}
