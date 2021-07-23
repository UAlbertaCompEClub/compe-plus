import { GetTokenSilentlyOptions } from '@auth0/auth0-react';
import axios, { AxiosResponse } from 'axios';

export type TokenAcquirer = (options?: GetTokenSilentlyOptions) => Promise<string>;

const fetchWithToken = async <T>(url: string, tokenAcquirer: TokenAcquirer, scopes?: string[]): Promise<AxiosResponse<T> | undefined> => {
    const token = await tokenAcquirer({
        scope: scopes?.join(' '),
    });
    return await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export default fetchWithToken;
