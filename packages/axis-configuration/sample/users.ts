import { AccessRights, Connection, User, UserAccounts } from '../src';

// John has viewer access rights and PTZ control
const userToAdd = new User('John', 'D2fK$xFpBaxtH@RQ5j', AccessRights.Viewer, true);

const add = async (userAccounts: UserAccounts): Promise<void> => {
    console.log(`> Add '${userToAdd.name}'...`);
    await userAccounts.add(userToAdd);
};

const update = async (userAccounts: UserAccounts): Promise<void> => {
    console.log(`> Update '${userToAdd.name}' by promoting him from viewer to operator...`);
    const promotion = new User(userToAdd.name, userToAdd.password, AccessRights.Operator, userToAdd.ptz);
    await userAccounts.update(promotion);
};

const list = async (userAccounts: UserAccounts): Promise<void> => {
    console.log('> List all users...');
    const users = await userAccounts.getAll();
    for (const user of users) {
        console.log(`    ${user.name} (${AccessRights[user.accessRights]})`);
    }
};

const remove = async (userAccounts: UserAccounts): Promise<void> => {
    console.log(`> Remove '${userToAdd.name}'...`);
    await userAccounts.remove(userToAdd.name);
};

export const run = async (connection: Connection): Promise<void> => {
    console.log(' Users');
    console.log('============================================================');

    const userAccounts = new UserAccounts(connection);

    await list(userAccounts);

    await add(userAccounts);
    await list(userAccounts);

    await update(userAccounts);
    await list(userAccounts);

    await remove(userAccounts);
    await list(userAccounts);

    console.log();
};
