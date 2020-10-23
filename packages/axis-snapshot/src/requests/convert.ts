import * as expect from '@fantasticfiasco/expect';
import { SnapshotOptions } from '../SnapshotOptions';

export function toQueryString(options?: SnapshotOptions): string | null {
    expect.toBeTrue(options?.resolution === undefined || options.resolution.length > 0, 'resolution cannot be an empty string');
    expect.toBeTrue(options?.palette === undefined || options.palette.length > 0, 'palette cannot be an empty string');

    if (options === undefined) {
        return null;
    }

    const parameters = Object.entries(options);
    if (parameters.length === 0) {
        return null;
    }

    return parameters.map(([key, value]) => `${key}=${value}`).join('&');
}
