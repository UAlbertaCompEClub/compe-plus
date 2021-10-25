import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import LoadingOverlay from '../../components/LoadingOverlay';
import StyledSelect from '../../components/StyledSelect';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setProgram, setYear } from '../../redux/slices/registerUserSlice';
import fetchUserInfo from '../../redux/thunks/fetchUserInfo';
import registerUser from '../../redux/thunks/registerUser';

const Registration: FC = () => {
    const history = useHistory();

    const { user, getAccessTokenSilently } = useAuth0();

    const { year, program, isLoading, registrationSuccess } = useAppSelector((state) => state.registerUser);

    const dispatch = useAppDispatch();

    // Redirect back to home once register finishes
    if (registrationSuccess) {
        dispatch(fetchUserInfo(getAccessTokenSilently));
        history.push('/');
    }

    const handleRegisterUser = () => {
        if (year <= 0 || program === '' || user === undefined) {
            alert('Form is incomplete, please complete the form');
            return;
        }

        dispatch(
            registerUser({
                tokenAcquirer: getAccessTokenSilently,
                userInfo: {
                    ccid: user.email?.split('@')[0] ?? '',
                    email: user.email ?? '',
                    familyName: user.family_name ?? '',
                    fullName: user?.name ?? '',
                    givenName: user?.given_name ?? '',
                    id: user?.sub ?? '',
                    year,
                    program,
                },
            }),
        );
    };

    const yearChoices = ['1', '2', '3', '4', '5', '6+'];
    const programChoices = ['Computer Co-op', 'Software Co-op', 'Nano Co-op', 'Computer Trad', 'Nano Trad', ' Other'];

    return (
        <div style={{ overflow: 'hidden' }}>
            <LoadingOverlay open={isLoading} />
            <Container>
                <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                    <Grid container item justify='center'>
                        <Typography variant='h1'>Registration</Typography>
                    </Grid>

                    <Grid container item spacing={4}>
                        <Grid item xs={12}>
                            <StyledSelect title='Year' value={year.toString()} onChange={(newYear) => dispatch(setYear(parseInt(newYear)))} choices={yearChoices} />{' '}
                        </Grid>
                        <Grid item xs={12}>
                            <StyledSelect title='Speciality' value={program} onChange={(newProgram) => dispatch(setProgram(newProgram))} choices={programChoices} />
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            <Button variant='contained' color='primary' onClick={handleRegisterUser}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Registration;
