import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Layout;
