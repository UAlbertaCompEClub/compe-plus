import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosResponse } from 'axios';

const fetchWithScopes = async <T>(url: string, scopes?: string[]): Promise<AxiosResponse<T> | undefined> => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently({
        scope: scopes?.join(' '),
    });
    return await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export default fetchWithScopes;
