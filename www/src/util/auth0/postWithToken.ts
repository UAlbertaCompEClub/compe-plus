import axios, { AxiosResponse } from 'axios';

import TokenAcquirer from './TokenAcquirer';

export const postWithToken = async <DataType, ResponseType>(url: string, tokenAcquirer: TokenAcquirer, scopes: string[], data?: DataType): Promise<AxiosResponse<ResponseType> | undefined> => {
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
