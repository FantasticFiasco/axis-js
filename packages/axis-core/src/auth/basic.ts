export const BASIC = 'Basic';

export interface Challenge {
    type: 'Basic';
    realm: string;
}

export const createHeader = (username: string, password: string, challenge: Challenge): string => {
    const credentials = base64(`${username}:${password}`);
    return `${challenge.type} ${credentials}`;
};

const base64 = (value: string): string => {
    return Buffer.from(value).toString('base64');
};
