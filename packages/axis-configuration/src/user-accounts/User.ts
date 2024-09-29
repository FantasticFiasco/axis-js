import * as expect from '@fantasticfiasco/expect';
import { AccessRights } from './AccessRights';

/**
 * Class describing a user.
 */
export class User {
    /**
     * Initializes a new instance of the class.
     * @param name The user account name (1-14 characters). Valid characters are a-z, A-Z and 0-9.
     * @param password The unencrypted password (1-64 characters) for the account. ASCII characters
     * from character code 32 to 126 are valid.
     * @param accessRights The access rights for the user.
     * @param ptz Whether user has access rights for PTZ control.
     */
    constructor(
        /**
         * Gets the user account name (1-14 characters). Valid characters are a-z, A-Z and 0-9.
         */
        readonly name: string,
        /**
         * Gwts the unencrypted password (1-64 characters) for the account. ASCII characters from
         * character code 32 to 126 are valid.
         */
        readonly password: string | undefined,
        /**
         * Gets the access rights for the user.
         */
        readonly accessRights: AccessRights,
        /**
         * Gets whether user has access rights for PTZ control.
         */
        readonly ptz: boolean,
    ) {
        // Valdate name
        expect.toBeTrue(name.length > 0 && name.length < 15, 'User name must be between 1-14 characters.');
        expect.toBeAlphanumeric(name, 'User name must only contain the characters a-z, A-Z and 0-9.');

        // Validate password
        if (password !== undefined) {
            expect.toBeTrue(password.length > 0 && password.length < 65, 'Password must be between 1-64 characters.');
            expect.toBeCharCodes(password, 32, 126, 'Password must only contain ASCII characters between 32 and 126');
        }
    }
}
