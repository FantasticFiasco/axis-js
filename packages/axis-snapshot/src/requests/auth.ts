import got from 'got';

export const basicAuth = async (url: string, username: string, password: string) => {
    const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

    return await got(url, {
        headers: {
            Authorization: auth,
        },
    });
};

// export const digestAuth = (username: string, password: string) => {
//     throw new Error('Not implemented.');
// };
