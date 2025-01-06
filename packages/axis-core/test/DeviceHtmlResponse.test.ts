import { DeviceHtmlResponse } from '../src/DeviceHtmlResponse';

class TestResponse extends DeviceHtmlResponse {
    constructor(response: Response) {
        super(response);
    }

    public assertSuccess(): void {
        throw new Error('Method not implemented.');
    }
}

describe('_body should', () => {
    test('return body', async () => {
        // Arrange
        const response = new Response('');

        expect(true).toBe(false);
    });
});
