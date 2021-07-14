import { IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { FC } from 'react';

export const UserProfile: FC = () => {
    return (
        <IconButton aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleMenu} color='inherit'>
            <AccountCircle />
        </IconButton>
    );
};
