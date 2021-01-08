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

        test('throw error given update fails', () => {
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
    });
});
