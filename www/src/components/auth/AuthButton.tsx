import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import React from 'react';

type BaseButtonProps = {
    text: string;
    onClick: () => void;
};

const BaseButton: React.FC<BaseButtonProps> = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();
    return <BaseButton text="Logout" onClick={() => logout()} />;
};

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <BaseButton text="Login" onClick={() => loginWithRedirect()} />;
};

const AuthButton: React.FC = () => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <LogoutButton />;
    }

    return <LoginButton />;
};

BaseButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default AuthButton;
