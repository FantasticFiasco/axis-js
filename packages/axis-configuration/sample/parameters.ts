import { Connection, Parameters } from '../src';

const networkBonjour = 'Network.Bonjour';
const networkBonjourFriendlyName = 'Network.Bonjour.FriendlyName';
const networkUpnpFriendlyName = 'Network.UPnP.FriendlyName';
const networkWildcardBonjour = 'Network.*.FriendlyName';

const getParameter = async (parameters: Parameters): Promise<void> => {
    console.log(`> Get parameter '${networkBonjourFriendlyName}'...`);
    const root = await parameters.get([networkBonjourFriendlyName]);
    print(root);
};

const getParameterGroup = async (parameters: Parameters): Promise<void> => {
    console.log(`> Get parameter group '${networkBonjour}'...`);
    const root = await parameters.get([networkBonjour]);
    print(root);
};

const getParameterWithWildcard = async (parameters: Parameters): Promise<void> => {
    console.log(`> Get parameter with wildcard '${networkWildcardBonjour}'...`);
    const root = await parameters.get([networkWildcardBonjour]);
    print(root);
};

const updateParameter = async (parameters: Parameters): Promise<void> => {
    console.log(`> Update parameter '${networkBonjourFriendlyName}'...`);
    await parameters.update(new Map<string, string>([[networkBonjourFriendlyName, 'New name']]));
};

const updateParameters = async (parameters: Parameters): Promise<void> => {
    console.log(`> Update parameters '${networkBonjourFriendlyName}' and '${networkUpnpFriendlyName}'...`);
    await parameters.update(
        new Map<string, string>([
            [networkBonjourFriendlyName, 'Even newer name'],
            [networkUpnpFriendlyName, 'Even newer name'],
        ]),
    );
};

const print = (root: Map<string, string>) => {
    for (const [name, value] of root.entries()) {
        console.log(`    ${name}=${value}`);
    }
};

export const run = async (connection: Connection): Promise<void> => {
    console.log(' Parameters');
    console.log('============================================================');

    const parameters = new Parameters(connection);

    await getParameter(parameters);
    await getParameterGroup(parameters);
    await getParameterWithWildcard(parameters);
    await updateParameter(parameters);
    await updateParameters(parameters);

    console.log();
};
