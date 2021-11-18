import { useAuth0 } from '@auth0/auth0-react';
import { Button, Grid, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';

import GiveAvailabilityIcon from '../../assets/give_availability.svg';
import LoadingOverlay from '../../components/LoadingOverlay';
import useUserContext from '../../hooks/useUserContext';
import getCalendlyLink from '../../redux/substores/volunteer/thunks/getCalendlyLink';
import setCalendlyLink from '../../redux/substores/volunteer/thunks/setCalendlyLink';
import { useVolunteerDispatch, useVolunteerSelector } from '../../redux/substores/volunteer/volunteerHooks';

const MockInterview: FC = () => {
    const classes = useStyles();
    const { calendlyLink, isLoading } = useVolunteerSelector((state) => state.mockInterview);
    const dispatch = useVolunteerDispatch();
    const { getAccessTokenSilently, user } = useAuth0();
    const [calendlyInput, setCalendlyInput] = useState<string>('');
    const userContext = useUserContext();

    useEffect(() => {
        if (user?.sub !== undefined) {
            dispatch(getCalendlyLink({ tokenAcquirer: getAccessTokenSilently, interviewerId: user.sub }));
        }
    }, [user]);

    const actionsShouldBeDisabled = !(userContext?.hasAgreedToTermsOfService ?? false);

    const submitLink = (
        <>
            <Grid container item xs={12} justify='center'>
                <Typography>
                    Give us a link to your <Link href='https://calendly.com/'>Calendly</Link> with your availability for running mock interviews.
                </Typography>
            </Grid>
            <Grid container item xs={12} justify='center'>
                <TextField
                    id='outlined-basic'
                    label='Calendly Link'
                    variant='outlined'
                    className={classes.textField}
                    InputLabelProps={{ className: classes.label }}
                    value={calendlyInput}
                    onChange={(e) => setCalendlyInput(e.target.value)}
                    disabled={actionsShouldBeDisabled}
                />
                <Button
                    variant='contained'
                    color='primary'
                    disabled={actionsShouldBeDisabled}
                    onClick={() => {
                        if (user?.sub !== undefined) {
                            dispatch(setCalendlyLink({ tokenAcquirer: getAccessTokenSilently, interviewerId: user.sub, link: calendlyInput }));
                        }
                    }}
                >
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
        <div style={{ overflow: 'hidden' }}>
            <LoadingOverlay open={isLoading} />
            <Grid container justify='center' alignItems='center' style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Mock Interviews</Typography>
                </Grid>
                <Grid container item spacing={4} justify='center'>
                    <Grid container item xs={12} justify='center'>
                        <img src={GiveAvailabilityIcon} />
                    </Grid>
                    {calendlyLink ? showLink : submitLink}
                </Grid>
            </Grid>
        </div>
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
