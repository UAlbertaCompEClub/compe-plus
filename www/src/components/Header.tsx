import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import logo from '../assets/logo_black.svg';

type Props = {
    sections: Section[];
    title: string;
};

export type Section = {
    title: string;
    url: string;
};

export const Header: FC<Props> = (props: Props): JSX.Element => {
    const classes = useStyles();
    const { sections, title } = props;

    return (
        <Toolbar className={classes.toolbar} disableGutters={true}>
            <img src={logo} className={classes.logo} />
            <Typography component="h2" variant="h5" color="inherit" align="left" noWrap className={classes.toolbarTitle}>
                {title}
            </Typography>
            {sections.map((section) => (
                <Link color="inherit" noWrap key={section.title} variant="body2" href={section.url} className={classes.toolbarLink}>
                    {section.title}
                </Link>
            ))}
            <Button variant="outlined" size="small">
                Login
            </Button>
        </Toolbar>
    );
};

const useStyles = makeStyles((theme) => ({
    toolbar: {
        boxShadow: '0px 5px 5px grey',
        paddingLeft: 10,
        paddingRight: 10,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    logo: {
        width: 37,
        height: 37,
        margin: 5,
    },
}));
