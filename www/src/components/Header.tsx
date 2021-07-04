import { AppBar, Hidden, Link, makeStyles, Toolbar } from '@material-ui/core';
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../assets/logo_white.svg';

type HeaderProps = {
    sections: Section[];
    title: string;
};

export type Section = {
    title: string;
    url: string;
};

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
    const classes = useStyles();
    const { sections, title } = props;

    const linkProps = sections.map((section) => {
        if (section.url.startsWith('/')) {
            return {
                component: RouterLink,
                to: section.url,
                title: section.title,
            };
        }

        return {
            href: section.url,
            title: section.title,
        };
    });

    return (
        <AppBar position='relative'>
            <Toolbar className={classes.toolbar}>
                <div className={classes.main}>
                    <a href={'/'}>
                        <img src={logo} className={classes.logo} />
                    </a>
                    <Link underline='none' color='textSecondary' variant='h5' href={'/'}>
                        {title}
                    </Link>
                </div>
                <Hidden xsDown>
                    {linkProps.map((linkProp) => (
                        <Link color='textSecondary' key={linkProp.title} variant='body2' {...linkProp} className={classes.toolbarLink}>
                            {linkProp.title}
                        </Link>
                    ))}
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles((theme) => ({
    toolbar: {
        boxShadow: '0px 5px 5px #547d54',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: theme.palette.primary.main,
    },
    main: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    toolbarLink: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    logo: {
        width: 37,
        height: 37,
        margin: 5,
    },
}));
