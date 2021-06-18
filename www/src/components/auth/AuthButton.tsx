import { Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, PropsWithChildren } from 'react';

type BaseButtonProps = {
    text: string;
    onClick: () => void;
};

const BaseButton: FC<BaseButtonProps> = (props: PropsWithChildren<BaseButtonProps>) => {
    return <button onClick={props.onClick}>{props.text}</button>;
};

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
