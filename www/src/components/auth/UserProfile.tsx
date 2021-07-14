import { useAuth0 } from '@auth0/auth0-react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { FC, useRef, useState } from 'react';

const UserProfile: FC = () => {
    const userProfileIcon = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useAuth0();
    return (
        <>
            <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                ref={userProfileIcon}
                onClick={() => {
                    setIsMenuOpen(true);
                }}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id='menu-appbar'
                anchorEl={userProfileIcon.current}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            >
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserProfile;
