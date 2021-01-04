export interface Challenge {
    type: 'Basic';
    realm: string;
}

export const generateAuthorizationHeader = (username: string, password: string, challenge: Challenge): string => {
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    return `${challenge.type} ${credentials}`;
};
