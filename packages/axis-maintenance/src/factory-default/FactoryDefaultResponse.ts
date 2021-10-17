import { UnknownError } from '..';
import { Response } from '../shared/Response';
import { FactoryDefaultType } from './FactoryDefaultType';

export class FactoryDefaultResponse extends Response {
    private static readonly SuccessResponsePartialType = /factoryMessage/i;
    private static readonly SuccessResponseHardType = /factoryMessage2/i;

    constructor(response: string, private readonly type: FactoryDefaultType) {
        super(response);
    }

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

        this.throwUnknownError();
    }

    private assertHardTypeSuccess() {
        if (FactoryDefaultResponse.SuccessResponseHardType.test(this.response)) {
            return;
        }

        this.throwUnknownError();
    }

    private throwUnknownError() {
        let body: string | null = this.html('body').html();

        if (body !== null) {
            body = body.trim();
            if (body) {
                throw new UnknownError(body);
            }
        }

        throw new UnknownError('Request to reset device to factory default was not successful');
    }
}
