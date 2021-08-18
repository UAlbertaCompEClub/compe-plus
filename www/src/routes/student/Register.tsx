import { useAuth0 } from '@auth0/auth0-react';
import { Button, Grid, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import LoadingOverlay from '../../components/LoadingOverlay';
import StyledSelect from '../../components/StyledSelect';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initializeUserInfo, setProgram, setYear } from '../../redux/slices/registerUserSlice';
import checkUserRegistration from '../../redux/thunks/checkUserRegistration';
import registerUser, { UserInfo } from '../../redux/thunks/registerUser';

const Registration: FC = () => {
    const history = useHistory();

    const { user, getAccessTokenSilently } = useAuth0();

    const { hasRegistered } = useAppSelector((state) => state.user);
    const { userInfo, isLoading } = useAppSelector((state) => state.registerUser);

    const dispatch = useAppDispatch();

    // Redirect back to home once register finishes
    if (hasRegistered) {
        dispatch(checkUserRegistration(getAccessTokenSilently));
        history.replace('/');
    }

    const handleRegisterUser = () => {
        if (userInfo === null || userInfo.year === undefined || userInfo.program === undefined) {
            alert('Form is incomplete, please complete the form');
            return;
        }

        dispatch(
            registerUser({
                tokenAcquirer: getAccessTokenSilently,
                userInfo: userInfo as UserInfo,
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
    }, [user, dispatch]);

    const yearChoices = ['1', '2', '3', '4', '5', '6+'];
    const programChoices = ['Computer Co-op', 'Software Co-op', 'Nano Co-op', 'Computer Trad', 'Nano Trad', ' Other'];

    return (
        <div style={{ overflow: 'hidden' }}>
            <LoadingOverlay open={isLoading} />
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Registration</Typography>
                </Grid>

                <Grid container item spacing={4}>
                    <Grid container item xs={12} justify='center'>
                        <form>
                            <StyledSelect title='Year' value={userInfo?.year?.toString() ?? ''} onChange={(newYear) => dispatch(setYear(parseInt(newYear)))} choices={yearChoices} />
                            <StyledSelect title='Speciality' value={userInfo?.program ?? ''} onChange={(newProgram) => dispatch(setProgram(newProgram))} choices={programChoices} />
                            <Button onClick={handleRegisterUser}>Submit</Button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Registration;
