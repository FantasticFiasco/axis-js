import { GetParametersResponse } from '../../../src/parameters/request-response/GetParametersResponse';

describe('get parameter response', () => {
    describe('#parameters should', () => {
        test('return single parameter', () => {
            // Arrange
            const response = new GetParametersResponse('root.Some.Parameter=some value');

            // Act
            const got = response.parameters;

            // Assert
            expect(got).toStrictEqual({
                'Some.Parameter': 'some value',
            });
        });

        test('return multiple parameters', () => {
            // Arrange
            const response = new GetParametersResponse('root.Some.Parameter=some value\nroot.Some.Other.Parameter=some other value');

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
            const response = new GetParametersResponse('root.Some.Parameter=some value\n# Error: some error');

            // Act
            const got = response.parameters;

            // Assert
            expect(got).toStrictEqual({
                'Some.Parameter': 'some value',
            });
        });

        test('not return invalid parameter', () => {
            // Arrange
            const response = new GetParametersResponse('root.Some.Parameter=some value\nroot.Some.Invalid.Parameter?some value');

            // Act
            const got = response.parameters;

            // Assert
            expect(got).toStrictEqual({
                'Some.Parameter': 'some value',
            });
        });
    });
});
