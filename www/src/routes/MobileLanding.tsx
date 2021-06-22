import { Grid, Typography, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import BlackLogo from '../assets/logo_black.svg';
import Wave1 from '../assets/wave_1.svg';

const MobileLanding: FC = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container item className={classes.wave_pattern} justify='center' style={{ minHeight: '50vh', paddingTop: '10vh' }} id='intro'>
                <Grid container item justify='center' spacing={5}>
                    <Grid container item xs={10} alignItems='center' justify='center' spacing={3}>
                        <Grid container item justify='center'>
                            <img src={BlackLogo} className={classes.logo_1} />
                            <Typography variant='h1'>CompE+</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align='center' variant='body1' style={{ fontWeight: 200 }}>
                                The developers are working very hard to build CompE+ with limited time so some funtionality had to be deferred. <br />
                                As such, this site is not optimized for mobile 😞 please open compe.plus on desktop
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <img src={Wave1} className={classes.wave} />
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    wave_pattern: {
        backgroundColor: theme.palette.primary.main,
    },
    wave: {
        width: '100%',
        height: 'auto',
    },
    logo_1: {
        width: '50%',
        height: 'auto',
    },
}));
export default MobileLanding;
