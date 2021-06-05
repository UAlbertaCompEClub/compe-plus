import React, { FC, PropsWithChildren } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type BaseButtonProps = {
    text: string;
    onClick: () => void;
};

const BaseButton: FC<BaseButtonProps> = (props: PropsWithChildren<BaseButtonProps>) => {
    return <button onClick={props.onClick}>{props.text}</button>;
};

const LogoutButton: FC = () => {
    const { logout } = useAuth0();
    return <BaseButton text="Logout" onClick={() => logout()} />;
};

const LoginButton: FC = () => {
    const { loginWithRedirect } = useAuth0();
    return <BaseButton text="Login" onClick={() => loginWithRedirect()} />;
};

const AuthButton: FC = () => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <LogoutButton />;
    }

    return <LoginButton />;
};

export default AuthButton;
