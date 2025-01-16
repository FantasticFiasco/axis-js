import * as expect from '@fantasticfiasco/expect';
import { Connection, fetchBuilder } from 'axis-core';
import { User } from '..';
import { AddUserRequest, handleAddUser } from './AddUser';
import { GetUsersRequest, handleGetUsers } from './GetUsers';
import { handleRemoveUser, RemoveUserRequest } from './RemoveUser';
import { handleUpdateUser, UpdateUserRequest } from './UpdateUser';

export let fetch = fetchBuilder(global.fetch);

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
     * @param init The object containing any custom settings that you want to apply to the request.
     * @throws {UserAlreadyExistsError} User already exists.
     */
    public async add(user: User, init?: RequestInit): Promise<void> {
        expect.toExist(user.password, 'Password must be specified.');

        const req = new AddUserRequest(this.connection, user);
        const res = await fetch(req, init);

        await handleAddUser(res);
    }

    /**
     * Gets all users.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    public async getAll(init?: RequestInit): Promise<User[]> {
        const req = new GetUsersRequest(this.connection);
        const res = await fetch(req, init);

        const users = await handleGetUsers(res);
        return users;
    }

    /**
     * Updates a user.
     * @param user The user to update. Please note that the password must be specified.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    public async update(user: User, init?: RequestInit): Promise<void> {
        expect.toExist(user.password, 'Password must be specified.');

        const req = new UpdateUserRequest(this.connection, user);
        const res = await fetch(req, init);

        await handleUpdateUser(res);
    }

    /**
     * Removes a user.
     * @param username The name of the user to remove.
     * @param init The object containing any custom settings that you want to apply to the request.
     */
    public async remove(username: string, init?: RequestInit): Promise<void> {
        const req = new RemoveUserRequest(this.connection, username);
        const res = await fetch(req, init);

        await handleRemoveUser(res);
    }
}
