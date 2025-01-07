import { AccessRights, User } from '../../../src';
import { GetUsersResponse } from '../../../src/user-accounts/request-response/GetUsersResponse';
import {
    ROOT,
    ROOT_AND_ADMIN_WITHOUT_PTZ,
    ROOT_AND_ADMIN_WITH_PTZ,
    ROOT_AND_OPERATOR_WITHOUT_PTZ,
    ROOT_AND_OPERATOR_WITH_PTZ,
    ROOT_AND_VIEWER_WITHOUT_PTZ,
    ROOT_AND_VIEWER_WITH_PTZ,
} from './GetUsersResponse.mock';

describe('get users response', () => {
    describe('#users should ', () => {
        test('return only root', async () => {
            // Arrange
            const res = new GetUsersResponse(new Response(ROOT));

            // Act
            await res.assertSuccess();
            const got = await res.users();

            // Assert
            const want = [new User('root', undefined, AccessRights.Administrator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root and admin with ptz', async () => {
            // Arrange
            const res = new GetUsersResponse(new Response(ROOT_AND_ADMIN_WITH_PTZ));

            // Act
            await res.assertSuccess();
            const got = await res.users();

            // Assert
            const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Administrator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root and admin without ptz', async () => {
            // Arrange
            const res = new GetUsersResponse(new Response(ROOT_AND_ADMIN_WITHOUT_PTZ));

            // Act
            await res.assertSuccess();
            const got = await res.users();

            // Assert
            const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Administrator, false)];
            expect(got).toStrictEqual(want);
        });

        test('return root and operator with ptz', async () => {
            // Arrange
            const res = new GetUsersResponse(new Response(ROOT_AND_OPERATOR_WITH_PTZ));

            // Act
            await res.assertSuccess();
            const got = await res.users();

            // Assert
            const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Operator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root and operator without ptz', async () => {
            // Arrange
            const res = new GetUsersResponse(new Response(ROOT_AND_OPERATOR_WITHOUT_PTZ));

            // Act
            await res.assertSuccess();
            const got = await res.users();

            // Assert
            const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Operator, false)];
            expect(got).toStrictEqual(want);
        });

        test('return root and viewer with ptz', async () => {
            // Arrange
            const res = new GetUsersResponse(new Response(ROOT_AND_VIEWER_WITH_PTZ));

            // Act
            await res.assertSuccess();
            const got = await res.users();

            // Assert
            const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Viewer, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root and viewer without ptz', async () => {
            // Arrange
            const res = new GetUsersResponse(new Response(ROOT_AND_VIEWER_WITHOUT_PTZ));

            // Act
            await res.assertSuccess();
            const got = await res.users();

            // Assert
            const want = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Viewer, false)];
            expect(got).toStrictEqual(want);
        });
    });
});
