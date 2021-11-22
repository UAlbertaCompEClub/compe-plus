import { useAuth0 } from '@auth0/auth0-react';
import { Divider, IconButton, Menu, MenuItem } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import React, { FC, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeUserProfileDialog, openEditRolesDialog, openUserProfileDialog } from '../../redux/slices/userSlice';

const UserProfile: FC = () => {
    const classes = useStyles();
    const userProfileIcon = useRef(null);
    const { isUserProfileOpen } = useAppSelector((state) => state.user);
    const { logout, user } = useAuth0();
    const ccid = user?.email?.split('@')[0] ?? '';

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                ref={userProfileIcon}
                onClick={() => {
                    dispatch(openUserProfileDialog());
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
                open={isUserProfileOpen}
                onClose={() => dispatch(closeUserProfileDialog())}
                classes={{ paper: classes.menuPaper }}
            >
                <MenuItem className={classes.menuItem}>Signed in as: {ccid}</MenuItem>
                <MenuItem className={classes.menuItem} onClick={() => dispatch(openEditRolesDialog())}>
                    Settings
                </MenuItem>
                <Divider className={classes.menuDivider} />
                <MenuItem className={classes.menuItem} onClick={handleLogout}>
                    Log out
                </MenuItem>
            </Menu>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    menuPaper: {
        backgroundColor: theme.palette.primary.dark,
    },
    menuItem: {
        color: theme.palette.primary.contrastText,
        fontSize: 20,
        fontWeight: 500,
    },
    menuDivider: {
        backgroundColor: fade(theme.palette.primary.contrastText, 0.12),
    },
}));

export default UserProfile;
