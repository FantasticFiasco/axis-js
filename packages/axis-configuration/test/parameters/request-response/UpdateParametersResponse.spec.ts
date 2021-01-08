import { UpdateParametersError } from '../../../src';
import { UpdateParametersResponse } from '../../../src/parameters/request-response/UpdateParametersResponse';

describe('update parameter response', () => {
    describe('#assertSuccess should', () => {
        test('succeed given ok response', () => {
            // Arrange
            const response = new UpdateParametersResponse('OK');

            // Act
            response.assertSuccess();
        });

        test('throw error given updating one parameter fails', () => {
            // Arrange
            const response = new UpdateParametersResponse("# Error: Error setting 'some value' to 'root.Some.Parameter'!");

            try {
                // Act
                response.assertSuccess();
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UpdateParametersError);
                expect(error?.parameterNames).toStrictEqual(['root.Some.Parameter']);
            }
        });

        test('throw error given updating multiple parameters fail', () => {
            // Arrange
            const response = new UpdateParametersResponse(
                [
                    "# Error: Error setting 'some value' to 'root.Some.Parameter'!",
                    "# Error: Error setting 'some other value' to 'root.Some.Other.Parameter'!",
                ].join('\n')
            );

            try {
                // Act
                response.assertSuccess();
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UpdateParametersError);
                expect(error?.parameterNames).toStrictEqual(['root.Some.Parameter', 'root.Some.Other.Parameter']);
            }
        });
    });
});
