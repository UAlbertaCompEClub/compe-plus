import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { FC, useRef } from 'react';

export const UserProfile: FC = () => {
    const userProfileIcon = useRef(null);
    return (
        <>
            <IconButton aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' color='inherit' ref={userProfileIcon}>
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
                open={true}
            >
                <MenuItem>Logout</MenuItem>
            </Menu>
        </>
    );
};
