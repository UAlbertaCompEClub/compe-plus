import { useAuth0 } from '@auth0/auth0-react';
import { Button, Grid, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import StyledSelect from '../../components/StyledSelect';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initializeUserInfo, setProgram, setYear } from '../../redux/slices/registerUserSlice';
import checkUserRegistration from '../../redux/thunks/checkUserRegistration';
import registerUser from '../../redux/thunks/registerUser';

const Registration: FC = () => {
    const history = useHistory();

    const { user, getAccessTokenSilently } = useAuth0();

    const { hasRegistered, info } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    if (hasRegistered) {
        // Redirect back to home once register finishes
        dispatch(checkUserRegistration(getAccessTokenSilently));
        history.replace('/');
    }

    const handleRegisterUser = () => {
        if (info === null || info.year === undefined || info.program === undefined) {
            alert('Form is incomplete, please complete the form');
            return;
        }

        dispatch(
            registerUser({
                tokenAcquirer: getAccessTokenSilently,
                userInfo: info,
            }),
        );
    };

    useEffect(() => {
        dispatch(
            initializeUserInfo({
                ccid: user?.email?.split('@')[0] ?? '',
                email: user?.email ?? '',
                familyName: user?.family_name ?? '',
                fullName: user?.name ?? '',
                givenName: user?.given_name ?? '',
                id: user?.sub ?? '',
            }),
        );
    }, []);

    const yearChoices = ['1', '2', '3', '4', '5', '5+'];
    const programChoices = ['Computer Co-op', 'Software Co-op', 'Nano Co-op', 'Computer Trad', 'Nano Trad', ' Other'];

    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Registration</Typography>
                </Grid>

                <Grid container item spacing={4}>
                    <Grid container item xs={12} justify='center'>
                        <form>
                            <StyledSelect title='Year' value={info?.year.toString() ?? ''} onChange={(newYear) => dispatch(setYear(parseInt(newYear)))} choices={yearChoices} />
                            <StyledSelect title='Speciality' value={info?.program ?? ''} onChange={(newProgram) => dispatch(setProgram(newProgram))} choices={programChoices} />
                            <Button onClick={handleRegisterUser}>Submit</Button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Registration;
