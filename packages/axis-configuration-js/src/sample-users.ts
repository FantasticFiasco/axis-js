import { AccessRights, Connection, User, UserAccounts } from './';

// John has viewer access rights and PTZ control
const userToAdd = new User('John', 'D2fK$xFpBaxtH@RQ5j', AccessRights.Viewer, true);

function add(userAccounts: UserAccounts): Promise<void> {
    console.log(`> Add '${userToAdd.name}'...`);
    return userAccounts.add(userToAdd);
}

function update(userAccounts: UserAccounts): Promise<void> {
    console.log(`> Update '${userToAdd.name}' by promoting him from viewer to operator...`);
    const promotion = new User(userToAdd.name, userToAdd.password, AccessRights.Operator, userToAdd.ptz);
    return userAccounts.update(promotion);
}

function list(userAccounts: UserAccounts): Promise<void> {
    console.log('> List all users...');
    return userAccounts.getAll().then((users: User[]) => {
        users.forEach((user) => {
            console.log(`    ${user.name} (${AccessRights[user.accessRights]})`);
        });
    });
}

function remove(userAccounts: UserAccounts): Promise<void> {
    console.log(`> Remove '${userToAdd.name}'...`);
    return userAccounts.remove(userToAdd.name);
}

export async function run(connection: Connection): Promise<void> {
    console.log(' Users');
    console.log('============================================================');

    const userAccounts = new UserAccounts(connection);

    await add(userAccounts)
        .then(() => update(userAccounts))
        .then(() => list(userAccounts))
        .then(() => remove(userAccounts));

    console.log();
}
