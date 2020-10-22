import { ExpectationError } from '@fantasticfiasco/expect';
import { AccessRights, User } from './../../src';
import { Generate } from './Generate';

describe('users', () => {
    describe('#ctor(name, ...)', () => {
        test('should throw exception if to short', () => {
            // Act
            const fn = () => new User(Generate.string(0), 'secret', AccessRights.Viewer, false);

            // Assert
            expect(fn).toThrowError(ExpectationError);
        });

        test('should throw exception if to long', () => {
            // Act
            const fn = () => new User(Generate.string(15), 'secret', AccessRights.Viewer, false);

            // Assert
            expect(fn).toThrowError(ExpectationError);
        });

        test('should throw exception if containing unsupported characters', () => {
            // Act
            const fn = () => new User('Joe-', 'secret', AccessRights.Viewer, false);

            // Assert
            expect(fn).toThrowError(ExpectationError);
        });
    });

    describe('#ctor(..., password, ...)', () => {
        test('should throw exception if to short', () => {
            // Act
            const fn = () => new User('Joe', Generate.string(0), AccessRights.Viewer, false);

            // Assert
            expect(fn).toThrowError(ExpectationError);
        });

        test('should throw exception if to long', () => {
            // Act
            const fn = () => new User('Joe', Generate.string(65), AccessRights.Viewer, false);

            // Assert
            expect(fn).toThrowError(ExpectationError);
        });

        test('should throw exception if containing unsupported characters', () => {
            // Act
            const fn = () => new User('Joe', `secret-${String.fromCharCode(31)}`, AccessRights.Viewer, false);

            // Assert
            expect(fn).toThrowError(ExpectationError);
        });
    });
});
