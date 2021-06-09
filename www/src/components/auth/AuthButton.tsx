import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';

const LogoutButton: FC = () => {
    const { logout } = useAuth0();
    return (
        <Button variant='outlined' color='secondary' onClick={() => logout()}>
            Logout
        </Button>
    );
};

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
        return <LogoutButton />;
    }

    return <LoginButton />;
};

export default AuthButton;
