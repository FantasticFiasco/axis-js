import { Connection, Parameters } from 'axis-configuration';

const networkBonjour = 'Network.Bonjour';
const networkBonjourFriendlyName = 'Network.Bonjour.FriendlyName';
const networkUpnpFriendlyName = 'Network.UPnP.FriendlyName';
const networkWildcardBonjour = 'Network.*.FriendlyName';

async function getParameter(parameters: Parameters): Promise<void> {
    console.log(`> Get parameter '${networkBonjourFriendlyName}'...`);
    const root = await parameters.get(networkBonjourFriendlyName);
    print(root);
}

async function getParameterGroup(parameters: Parameters): Promise<void> {
    console.log(`> Get parameter group '${networkBonjour}'...`);
    const root = await parameters.get(networkBonjour);
    print(root);
}

async function getParameterWithWildcard(parameters: Parameters): Promise<void> {
    console.log(`> Get parameter with wildcard '${networkWildcardBonjour}'...`);
    const root = await parameters.get(networkWildcardBonjour);
    print(root);
}

async function updateParameter(parameters: Parameters): Promise<void> {
    console.log(`> Update parameter '${networkBonjourFriendlyName}'...`);
    await parameters.update({ [networkBonjourFriendlyName]: 'New name' });
}

async function updateParameters(parameters: Parameters): Promise<void> {
    console.log(`> Update parameters '${networkBonjourFriendlyName}' and '${networkUpnpFriendlyName}'...`);
    await parameters.update({
        [networkBonjourFriendlyName]: 'Even newer name',
        [networkUpnpFriendlyName]: 'Even newer name',
    });
}

function print(root: { [name: string]: string }) {
    for (const parameter in root) {
        if (root.hasOwnProperty(parameter)) {
            console.log(`    ${parameter}=${root[parameter]}`);
        }
    }
}

export async function run(connection: Connection): Promise<void> {
    console.log(' Parameters');
    console.log('============================================================');

    const parameters = new Parameters(connection);

    await getParameter(parameters)
        .then(() => getParameterGroup(parameters))
        .then(() => getParameterWithWildcard(parameters))
        .then(() => updateParameter(parameters))
        .then(() => updateParameters(parameters));

    console.log();
}
