import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';

type TitledPageProps = {
    title: string;
    children: ReactNode;
};

const TitledPage: React.FC<TitledPageProps> = (props: TitledPageProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.page}>
            <Typography variant='h1' className={classes.title} align='center'>
                {props.title}
            </Typography>
            {props.children}
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(6),
    },
    page: {
        height: '100%',
    },
}));

export default TitledPage;
