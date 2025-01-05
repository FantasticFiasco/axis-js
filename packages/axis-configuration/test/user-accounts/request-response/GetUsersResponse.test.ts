import { AccessRights, User } from '../../../src';
import { GetUsersResponse } from '../../../src/user-accounts/request-response/GetUsersResponse';
import {
    ROOT,
    ROOT_AND_JOHN_THE_ADMINISTRATOR_WITHOUT_PTZ,
    ROOT_AND_JOHN_THE_ADMINISTRATOR_WITH_PTZ,
    ROOT_AND_JOHN_THE_OPERATOR_WITHOUT_PTZ,
    ROOT_AND_JOHN_THE_OPERATOR_WITH_PTZ,
    ROOT_AND_JOHN_THE_VIEWER_WITHOUT_PTZ,
    ROOT_AND_JOHN_THE_VIEWER_WITH_PTZ,
} from './GetUsersResponse.mock';

describe('get users response', () => {
    describe('#users should ', () => {
        test('return only root', () => {
            // Arrange
            const res = new GetUsersResponse(ROOT);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root and John as administrators', () => {
            // Arrange
            const res = new GetUsersResponse(ROOT_AND_JOHN_THE_ADMINISTRATOR_WITH_PTZ);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Administrator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root and John as administrator without ptz', () => {
            // Arrange
            const res = new GetUsersResponse(ROOT_AND_JOHN_THE_ADMINISTRATOR_WITHOUT_PTZ);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [
                new User('root', undefined, AccessRights.Administrator, true),
                new User('John', undefined, AccessRights.Administrator, false),
            ];
            expect(got).toStrictEqual(want);
        });

        test('return root as administrator and John as operator', () => {
            // Arrange
            const res = new GetUsersResponse(ROOT_AND_JOHN_THE_OPERATOR_WITH_PTZ);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Operator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root as administrator and John as operator without ptz', () => {
            // Arrange
            const res = new GetUsersResponse(ROOT_AND_JOHN_THE_OPERATOR_WITHOUT_PTZ);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Operator, false)];
            expect(got).toStrictEqual(want);
        });

        test('return root as administrator and John as viewer', () => {
            // Arrange
            const res = new GetUsersResponse(ROOT_AND_JOHN_THE_VIEWER_WITH_PTZ);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Viewer, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root as administrator and John as viewer without ptz', () => {
            // Arrange
            const res = new GetUsersResponse(ROOT_AND_JOHN_THE_VIEWER_WITHOUT_PTZ);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Viewer, false)];
            expect(got).toStrictEqual(want);
        });
    });
});
