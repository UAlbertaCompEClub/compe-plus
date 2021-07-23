import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import config from '../config';

const fetchWithAuth0 = async <T>(url: string, scopes?: string[]): Promise<T> => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently({
        audience: config.server.audience,
        scope: scopes?.join(' '),
    });
    return await axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export default fetchWithAuth0;
