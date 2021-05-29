import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import logo from '../assets/logo_white.svg';
import OutlinedButton from './OutlinedButton';
import { Container } from '@material-ui/core';

type Props = {
    sections: Section[];
    title: string;
};

export type Section = {
    title: string;
    url: string;
};

export const Header: FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { sections, title } = props;

    return (
        <Toolbar className={classes.toolbar} disableGutters={true}>
            <img src={logo} className={classes.logo} />
            <Typography component="h2" variant="h5" align="left" noWrap>
                {title}
            </Typography>
            <Container className={classes.linkContainer}>
                {sections.map((section) => (
                    <Link color="inherit" noWrap key={section.title} variant="body2" href={section.url} className={classes.toolbarLink}>
                        {section.title}
                    </Link>
                ))}
            </Container>
            <OutlinedButton title={'Login'} url={'#'} />
        </Toolbar>
    );
};

const useStyles = makeStyles((theme) => ({
    toolbar: {
        boxShadow: '0px 5px 5px grey',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
    },
    linkContainer: {
        display: 'inline-block',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    toolbarLink: {
        padding: theme.spacing(8),
        flexShrink: 0,
        color: theme.palette.text.primary,
    },
    logo: {
        width: 37,
        height: 37,
        margin: 5,
    },
}));
