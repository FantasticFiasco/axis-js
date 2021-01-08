import { AccessRights } from '../../../src';
import { GetUsersResponse } from '../../../src/user-accounts/request-response/GetUsersResponse';
import { DEFAULT_USERS } from './GetUsersResponse.mock';

describe('get users response', () => {
    describe('#users should ', () => {
        test('return only root', () => {
            // Arrange
            const response = new GetUsersResponse(DEFAULT_USERS);

            // Act
            const got = response.users;

            // Assert
            expect(got).toStrictEqual([{ name: 'root', accessRights: AccessRights.Administrator, ptz: true }]);
        });
    });
});
