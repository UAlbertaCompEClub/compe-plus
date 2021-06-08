import { useAuth0 } from '@auth0/auth0-react';
import React, { FC } from 'react';

export const MockInterview: FC = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <div>MockInterview (logged in!!)</div> : <div>MockInterview (not logged in!!)</div>;
};
