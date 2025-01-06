import { UpdateParametersError } from '../../../src';
import { UpdateParametersResponse } from '../../../src/parameters/request-response/UpdateParametersResponse';

describe('update parameter response', () => {
    describe('#assertSuccess should', () => {
        test('succeed given ok response', async () => {
            // Arrange
            const res = new UpdateParametersResponse(new Response('OK'));

            // Act
            await res.assertSuccess();
        });

        test('throw error given updating one parameter fails', async () => {
            // Arrange
            const res = new UpdateParametersResponse(new Response("# Error: Error setting 'root.Some.Parameter' to 'some value'!"));

            try {
                // Act
                await res.assertSuccess();
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UpdateParametersError);
                expect((error as UpdateParametersError).parameterNames).toStrictEqual(['root.Some.Parameter']);
            }
        });

        test('throw error given updating multiple parameters fail', async () => {
            // Arrange
            const res = new UpdateParametersResponse(
                new Response(
                    [
                        "# Error: Error setting 'root.Some.Parameter' to 'some value'!",
                        "# Error: Error setting 'root.Some.Other.Parameter' to 'some other value'!",
                    ].join('\n'),
                ),
            );

            try {
                // Act
                await res.assertSuccess();
                throw new Error('This exception should not be thrown');
            } catch (error) {
                // Assert
                expect(error).toBeInstanceOf(UpdateParametersError);
                expect((error as UpdateParametersError).parameterNames).toStrictEqual(['root.Some.Parameter', 'root.Some.Other.Parameter']);
            }
        });
    });
});
