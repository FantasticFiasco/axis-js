import { AccessRights, User } from '../../../src';
import { GetUsersResponse } from '../../../src/user-accounts/request-response/GetUsersResponse';
import { ROOT, ROOT_AND_ANOTHER_ADMINISTRATOR, ROOT_AND_ANOTHER_OPERATOR, ROOT_AND_ANOTHER_VIEWER } from './GetUsersResponse.mock';

describe('get users response', () => {
    describe('#users should ', () => {
        test('return only root', () => {
            // Arrange
            const response = new GetUsersResponse(ROOT);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root and John as administrators', () => {
            // Arrange
            const response = new GetUsersResponse(ROOT_AND_ANOTHER_ADMINISTRATOR);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Administrator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root as administrator and John as operator', () => {
            // Arrange
            const response = new GetUsersResponse(ROOT_AND_ANOTHER_OPERATOR);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Operator, true)];
            expect(got).toStrictEqual(want);
        });

        test('return root as administrator and John as viewer', () => {
            // Arrange
            const response = new GetUsersResponse(ROOT_AND_ANOTHER_VIEWER);

            // Act
            const got = response.users;

            // Assert
            const want: User[] = [new User('root', undefined, AccessRights.Administrator, true), new User('John', undefined, AccessRights.Viewer, true)];
            expect(got).toStrictEqual(want);
        });
    });
});
