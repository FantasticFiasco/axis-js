import { GetParametersResponse } from '../../../src/parameters/request-response/GetParametersResponse';

describe('get parameter response', () => {
    describe('#parameters should', () => {
        test('return single parameter', async () => {
            // Arrange
            const res = new GetParametersResponse(new Response('root.Some.Parameter=some value'));

            // Act
            await res.assertSuccess();
            const got = await res.parameters();

            // Assert
            expect(got).toStrictEqual(new Map<string, string>([['Some.Parameter', 'some value']]));
        });

        test('return multiple parameters', async () => {
            // Arrange
            const res = new GetParametersResponse(new Response(['root.Some.Parameter=some value', 'root.Some.Other.Parameter=some other value'].join('\n')));

            // Act
            await res.assertSuccess();
            const got = await res.parameters();

            // Assert
            expect(got).toStrictEqual(
                new Map<string, string>([
                    ['Some.Parameter', 'some value'],
                    ['Some.Other.Parameter', 'some other value'],
                ]),
            );
        });

        test('not return parameter with error', async () => {
            // Arrange
            const res = new GetParametersResponse(new Response(['root.Some.Parameter=some value', '# Error: some error'].join('\n')));

            // Act
            await res.assertSuccess();
            const got = await res.parameters();

            // Assert
            expect(got).toStrictEqual(new Map<string, string>([['Some.Parameter', 'some value']]));
        });

        test('not return invalid parameter', async () => {
            // Arrange
            const res = new GetParametersResponse(new Response(['root.Some.Parameter=some value', 'root.Some.Invalid.Parameter?some value'].join('\n')));

            // Act
            await res.assertSuccess();
            const got = await res.parameters();

            // Assert
            expect(got).toStrictEqual(new Map<string, string>([['Some.Parameter', 'some value']]));
        });
    });
});
