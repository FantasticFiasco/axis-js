import * as expect from '@fantasticfiasco/expect';
import { Connection } from 'axis-core';
import { User } from '..';
import { AddUserRequest } from './request-response/AddUserRequest';
import { GetUsersRequest } from './request-response/GetUsersRequest';
import { RemoveUserRequest } from './request-response/RemoveUserRequest';
import { UpdateUserRequest } from './request-response/UpdateUserRequest';

/**
 * Class responsible for adding a new user account with password and group membership, modify the
 * information and remove a user account.
 */
export class UserAccounts {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * Adds a new user.
     * @param user The user to add. Please note that the password must be specified.
     * @throws {UserAlreadyExistsError} User already exists.
     */
    public async add(user: User): Promise<void> {
        expect.toExist(user.password, 'Password must be specified.');

        const req = new AddUserRequest(this.connection, user);
        const res = await req.send();

        await res.assertSuccess();
    }

    /**
     * Gets all users.
     */
    public async getAll(): Promise<User[]> {
        const req = new GetUsersRequest(this.connection);
        const res = await req.send();

        await res.assertSuccess();

        const users = await res.users();
        return users;
    }

    /**
     * Updates a user.
     * @param user The user to update. Please note that the password must be specified.
     */
    public async update(user: User): Promise<void> {
        expect.toExist(user.password, 'Password must be specified.');

        const req = new UpdateUserRequest(this.connection, user);
        const res = await req.send();

        await res.assertSuccess();
    }

    /**
     * Removes a user.
     * @param username The name of the user to remove.
     */
    public async remove(username: string): Promise<void> {
        const req = new RemoveUserRequest(this.connection, username);
        const res = await req.send();

        await res.assertSuccess();
    }
}
