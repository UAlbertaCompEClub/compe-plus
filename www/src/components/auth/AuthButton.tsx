import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import React, { FC } from 'react';

import UserProfile from './UserProfile';

const LoginButton: FC = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button variant='outlined' color='secondary' onClick={() => loginWithRedirect()}>
            Login
        </Button>
    );
};

const AuthButton: FC = () => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <UserProfile />;
    }

    return <LoginButton />;
};

export default AuthButton;
