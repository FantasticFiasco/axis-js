import { BASIC, Challenge, createHeader } from '../../src/auth/basic';

describe('#createHeader should', () => {
    test('generate correct header value', () => {
        // Arrange
        const testCases: { username: string; password: string; want: string }[] = [
            { username: 'root', password: 'pass', want: 'Basic cm9vdDpwYXNz' },
            { username: 'guest', password: 'guest', want: 'Basic Z3Vlc3Q6Z3Vlc3Q=' },
            { username: 'Jane', password: 'Doe', want: 'Basic SmFuZTpEb2U=' },
        ];

        const challenge: Challenge = {
            type: BASIC,
            realm: 'test',
        };

        for (const { username, password, want } of testCases) {
            // Act
            const got = createHeader(username, password, challenge);

            // Assert
            expect(got).toBe(want);
        }
    });
});
