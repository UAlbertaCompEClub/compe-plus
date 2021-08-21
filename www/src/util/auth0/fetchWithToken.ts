import axios, { AxiosResponse } from 'axios';

import TokenAcquirer from './TokenAcquirer';

const fetchWithToken = async <T>(url: string, tokenAcquirer: TokenAcquirer, scopes?: string[], params?: Record<string, unknown>): Promise<AxiosResponse<T> | undefined> => {
    const token = await tokenAcquirer({
        scope: scopes?.join(' '),
    });
    return await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        params,
    });
};

export default fetchWithToken;
