import axios, { AxiosResponse } from 'axios';

import TokenAcquirer from './TokenAcquirer';

const postWithToken = async <BodyType, ResponseType>(url: string, tokenAcquirer: TokenAcquirer, scopes: string[], data?: BodyType): Promise<AxiosResponse<ResponseType> | undefined> => {
    try {
        const token = await tokenAcquirer({
            scope: scopes.join(' '),
        });
        return axios.post(url, data, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
    } catch (e) {
        console.error(e);
    }
    return undefined;
};

export default postWithToken;
