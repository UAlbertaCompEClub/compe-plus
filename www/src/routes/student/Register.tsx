import { useAuth0 } from '@auth0/auth0-react';
import { Button, Grid, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import StyledSelect from '../../components/StyledSelect';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import registerUser from '../../redux/thunks/registerUser';

const Registration: FC = () => {
    const history = useHistory();

    const [year, setYear] = useState('');
    const [speciality, setSpeciality] = useState('');

    const { user, getAccessTokenSilently } = useAuth0();

    const { hasRegistered } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    if (hasRegistered) {
        // Redirect back to home once register finishes
        history.replace('/');
    }

    const handleRegisterUser = () => {
        dispatch(
            registerUser({
                tokenAcquirer: getAccessTokenSilently,
                userInfo: {
                    ccid: user?.email?.split('@')[0] ?? '',
                    email: user?.email ?? '',
                    familyName: user?.family_name ?? '',
                    fullName: user?.name ?? '',
                    givenName: user?.given_name ?? '',
                    id: user?.sub ?? '',
                    program: speciality,
                    year: parseInt(year),
                },
            }),
        );
    };

    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Registration</Typography>
                </Grid>

                <Grid container item spacing={4}>
                    <Grid container item xs={12} justify='center'>
                        <form>
                            <StyledSelect title='Year' value={year} onChange={setYear} choices={['1', '2', '3', '4', '5', '5+']} />
                            <StyledSelect
                                title='Speciality'
                                value={speciality}
                                onChange={setSpeciality}
                                choices={['Computer Co-op', 'Software Co-op', 'Nano Co-op', 'Computer Trad', 'Nano Trad', ' Other']}
                            />
                            <Button onClick={handleRegisterUser}>Submit</Button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Registration;
