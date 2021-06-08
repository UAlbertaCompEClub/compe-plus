import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import OutlinedButton from '../OutlinedButton';

const LogoutButton: FC = () => {
    const { logout } = useAuth0();
    return <OutlinedButton text='Logout' onClick={() => logout()} />;
};

const LoginButton: FC = () => {
    const { loginWithRedirect } = useAuth0();
    return <OutlinedButton text='Login' onClick={() => loginWithRedirect()} />;
};

const AuthButton: FC = () => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <LogoutButton />;
    }

    return <LoginButton />;
};

export default AuthButton;
