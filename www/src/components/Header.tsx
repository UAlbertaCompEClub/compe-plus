// Libraries
import React, { FC } from 'react';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
// Assets
import logo from '../assets/logo_white.svg';

// Components
import OutlinedButton from './OutlinedButton';

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
                <img src={logo} className={classes.logo} />
                <Link underline='none' color='inherit' noWrap variant='h5' href={'/'} className={classes.title}>
                    {title}
                </Link>
                <Container className={classes.linkContainer}>
                    {sections.map((section) => (
                        <Link color='inherit' noWrap key={section.title} variant='body2' href={section.url} className={classes.toolbarLink}>
                            {section.title}
                        </Link>
                    ))}
                </Container>
                <OutlinedButton title={'Login'} url={'#'} />
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
    linkContainer: {
        display: 'inline-block',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    toolbarLink: {
        padding: theme.spacing(8),
        flexShrink: 0,
        color: theme.palette.text.secondary,
    },
    logo: {
        width: 37,
        height: 37,
        margin: 5,
    },
    title: {
        color: theme.palette.text.secondary,
    },
    button: {
        color: theme.palette.text.secondary,
    },
}));
