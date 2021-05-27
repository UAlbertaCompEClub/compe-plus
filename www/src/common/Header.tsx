import React from 'react';
import Spacer from './Spacer';

const Header: React.FC = () => {
    return (
        <header className="container flex mx-auto xl:max-w-screen-xl my-4">
            <div>CompE+</div>
            <Spacer />
            <div>Stuff</div>
            <Spacer />
            <div>Login</div>
        </header>
    );
};

export default Header;
