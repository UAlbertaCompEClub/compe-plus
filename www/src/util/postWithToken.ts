import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosResponse } from 'axios';

export const postWithToken = async <DataType, ResponseType>(url: string, scopes: string[], data?: DataType): Promise<AxiosResponse<ResponseType> | undefined> => {
    const { getAccessTokenSilently } = useAuth0();
    try {
        const token = await getAccessTokenSilently({
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
