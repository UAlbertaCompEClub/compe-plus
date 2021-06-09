// Libraries
import React, { FC } from 'react';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';

// Assets
import logo from '../assets/logo_white.svg';

// Components
import AuthButton from './auth/AuthButton';

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

    return (
        <AppBar position='relative'>
            <Toolbar className={classes.toolbar} disableGutters={true}>
                <div className={classes.main}>
                    <img src={logo} className={classes.logo} />
                    <Link underline='none' color='textSecondary' variant='h5' href={'/'}>
                        {title}
                    </Link>
                    {sections.map((section) => (
                        <Link color='textSecondary' key={section.title} variant='body2' href={section.url} className={classes.toolbarLink}>
                            {section.title}
                        </Link>
                    ))}
                </div>

                <AuthButton />
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
