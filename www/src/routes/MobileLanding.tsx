import { Grid, Typography, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

import BlackLogo from '../assets/logo_black.svg';
import LightGreenLogo from '../assets/logo_light_green.svg';
import Wave1 from '../assets/wave_1.svg';
import Wave4 from '../assets/wave_4.svg';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Form } from '../components/Form';
import config from '../util/config';
import validator from 'validator';

const MobileLanding: FC = () => {
    const classes = useStyles();
    const getMessage = (status: string | null): string => {
        if (status == 'error') {
            return 'Something went wrong :( Please try again';
        } else if (status == 'sending') {
            return 'Adding you to the mailing list...';
        } else if (status == 'success') {
            return 'You have been added to the mailing list :)';
        }

        return '';
    };
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
                                The developers are working very hard to build CompE+ with limited time so some functionality had to be deferred. <br />
                                As such, this site is not optimized for mobile 😞 please open compe.plus on desktop
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <img src={Wave1} className={classes.wave} />
            <Grid container item justify='center' style={{ minHeight: '50vh' }}>
                <Grid container item justify='center' xs={10} spacing={2}>
                    <Grid container item alignItems='center' justify='center' spacing={2}>
                        <Grid item>
                            <Typography variant='h1'>Mailing List</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align='center' variant='body1' style={{ fontWeight: 200 }}>
                                For updates on CompE+ or if you would like to volunteer to review resumes or hold mock interviews, sign up for our mailing list:
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item justify='center' alignItems='center'>
                        <MailchimpSubscribe
                            url={config.mailchimpUrl}
                            render={({ subscribe, status }) => (
                                <Grid container item justify='center' alignItems='center'>
                                    <Form
                                        textPlaceholder='Email Address'
                                        callback={(email) => {
                                            subscribe({ EMAIL: email });
                                        }}
                                        buttonPlaceholder='Submit'
                                        valueValidator={(email) => validator.isEmail(email)}
                                    />
                                    <Grid item>
                                        <Typography align='center' variant='body1' style={{ fontWeight: 200 }}>
                                            {getMessage(status)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <img src={Wave4} className={classes.wave} />
            <Grid container item className={classes.footer}>
                <Grid container item className={classes.wave_pattern} justify='center' direction='column' alignItems='center'>
                    <img src={LightGreenLogo} className={classes.footer_logo} />
                </Grid>
            </Grid>
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
