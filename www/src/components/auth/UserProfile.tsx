import { useAuth0 } from '@auth0/auth0-react';
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import React, { FC, useRef, useState } from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { openEditRolesDialog } from '../../redux/slices/userSlice';

const UserProfile: FC = () => {
    const classes = useStyles();
    const userProfileIcon = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout, user } = useAuth0();
    const ccid = user?.email?.split('@')[0] ?? '';

    const dispatch = useAppDispatch();

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
                <AccountCircle color='secondary' />
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
                className={classes.menu}
            >
                <Typography className={classes.menu_text}> Signed in as: {ccid} </Typography>
                <MenuItem onClick={() => dispatch(openEditRolesDialog())} className={classes.menu_text} style={{ marginBottom: '100px' }}>
                    Settings
                </MenuItem>
                <MenuItem onClick={() => logout()} className={classes.menu_text}>
                    Log out
                </MenuItem>
            </Menu>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    menu: {
        '& .MuiPaper-root': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    menu_text: {
        color: theme.palette.text.secondary,
        fontSize: 20,
        fontWeight: 500,
        padding: '15px',
    },
}));

export default UserProfile;
