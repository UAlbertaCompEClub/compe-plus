import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import BlackLogo from '../../assets/logo_black.svg';
import Wave1 from '../../assets/wave_1.svg';

const MobileLanding: FC = () => {
    const classes = useStyles();

    return (
        <Grid container item style={{ overflowX: 'hidden' }}>
            <Grid container item className={classes.wave_pattern} justify='center' style={{ minHeight: '50vh', paddingTop: '5vh' }} id='intro'>
                <Grid container item justify='center' spacing={5}>
                    <Grid container item xs={10} alignItems='center' justify='center' spacing={3}>
                        <Grid container item justify='center'>
                            <img src={BlackLogo} className={classes.logo_1} />
                            <Typography variant='h1'>CompE+</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align='center' variant='body1' style={{ fontWeight: 200 }}>
                                The developers are worked very hard to build CompE+ with limited time so some functionality had to be deferred. <br />
                                As such, this site is not optimized for mobile 😞 please open www.compe.plus on desktop
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <img src={Wave1} className={classes.wave} />
        </Grid>
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
    text_input_root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: 0,
    },
    text_input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    text_input_icon_button: {
        padding: 10,
    },
    text_input_divider: {
        height: 28,
        margin: 4,
    },
    main_button: {
        backgroundColor: theme.palette.primary.dark,
        outlineColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
        fontWeight: 500,
        borderRadius: 0,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
        },
    },
    footer: {
        padding: '0',
        marginTop: '-1vh',
    },
    footer_logo: {
        width: '10%',
        height: 'auto',
        margin: '1em',
    },
}));
export default MobileLanding;
