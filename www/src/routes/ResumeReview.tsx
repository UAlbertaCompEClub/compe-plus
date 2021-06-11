import React, { FC } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import config from '../util/config';

const ResumeReview: FC = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    try {
        async () => {
            const token = await getAccessTokenSilently({
                audience: config.server.audience,
                scope: 'call:ping',
            });

            const response = await axios.get(`${config.server.endpoint}/api/secure/v1/ping`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
        };
    } catch (e) {
        console.error(e);
    }

    return isAuthenticated ? <div>ResumeReview (logged in!!)</div> : <div>ResumeReview (not logged in!!)</div>;
};

export default ResumeReview;
