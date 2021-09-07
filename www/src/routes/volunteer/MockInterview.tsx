import { Button, Grid, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import GiveAvailabilityIcon from '../../assets/give_availability.svg';
import TitledPage from '../../components/TitledPage';

const MockInterview: FC = () => {
    const classes = useStyles();

    // TODO hit backend to see if the volunteer has uploaded a Calendly link
    const calendlyLink = '';

    const submitLink = (
        <>
            <Grid container item xs={12} justify='center'>
                <Typography>
                    Give us a link to your <Link href='https://calendly.com/'>Calendly</Link> with your availability for running mock interviews.
                </Typography>
            </Grid>
            <Grid container item xs={12} justify='center'>
                <TextField id='outlined-basic' label='Calendly Link' variant='outlined' className={classes.textField} InputLabelProps={{ className: classes.label }} />
                <Button variant='contained' color='primary' onClick={() => console.log('TODO')}>
                    Submit
                </Button>
            </Grid>
        </>
    );

    const showLink = (
        <Grid container item xs={6} justify='center'>
            <Typography align='center'>
                Here is the <Link href={calendlyLink}>Calendly link</Link> you gave us. Students will be visiting this to schedule mock interviews with you. If you need to update this link please
                reach out to an admin.
            </Typography>
        </Grid>
    );

    return (
        <TitledPage title='Mock Interviews'>
            <Grid container justify='center' alignItems='center'>
                <Grid container item spacing={4} justify='center'>
                    <Grid container item xs={12} justify='center'>
                        <img src={GiveAvailabilityIcon} />
                    </Grid>
                    {calendlyLink ? showLink : submitLink}
                </Grid>
            </Grid>
        </TitledPage>
    );
};

const useStyles = makeStyles((theme) => ({
    textField: {
        marginRight: 20,
    },
    label: {
        color: theme.palette.primary.dark,
    },
}));

export default MockInterview;
