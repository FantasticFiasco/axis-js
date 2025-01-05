import { GetParametersResponse } from '../../../src/parameters/request-response/GetParametersResponse';

describe('get parameter response', () => {
    describe('#parameters should', () => {
        test('return single parameter', () => {
            // Arrange
            const res = new GetParametersResponse('root.Some.Parameter=some value');

            // Act
            const got = response.parameters;

            // Assert
            expect(got).toStrictEqual({
                'Some.Parameter': 'some value',
            });
        });

        test('return multiple parameters', () => {
            // Arrange
            const res = new GetParametersResponse(['root.Some.Parameter=some value', 'root.Some.Other.Parameter=some other value'].join('\n'));

            // Act
            const got = response.parameters;

            // Assert
            expect(got).toStrictEqual({
                'Some.Parameter': 'some value',
                'Some.Other.Parameter': 'some other value',
            });
        });

        test('not return parameter with error', () => {
            // Arrange
            const res = new GetParametersResponse(['root.Some.Parameter=some value', '# Error: some error'].join('\n'));

            // Act
            const got = response.parameters;

            // Assert
            expect(got).toStrictEqual({
                'Some.Parameter': 'some value',
            });
        });

        test('not return invalid parameter', () => {
            // Arrange
            const res = new GetParametersResponse(['root.Some.Parameter=some value', 'root.Some.Invalid.Parameter?some value'].join('\n'));

            // Act
            const got = response.parameters;

            // Assert
            expect(got).toStrictEqual({
                'Some.Parameter': 'some value',
            });
        });
    });
});
