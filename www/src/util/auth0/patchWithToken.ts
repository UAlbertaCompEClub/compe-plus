import axios, { AxiosResponse } from 'axios';

import TokenAcquirer from './TokenAcquirer';

const patchWithToken = async <T>(url: string, tokenAcquirer: TokenAcquirer, data: Record<string, unknown>, scopes?: string[]): Promise<AxiosResponse<T> | undefined> => {
    const token = await tokenAcquirer({
        scope: scopes?.join(' '),
    });
    return await axios.patch(url, data, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export default patchWithToken;
