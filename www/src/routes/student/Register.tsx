import { Grid, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';

import StyledSelect from '../../components/StyledSelect';

const Registration: FC = () => {
    const [year, setYear] = useState('');
    const [speciality, setSpeciality] = useState('');
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
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
export default Registration;
