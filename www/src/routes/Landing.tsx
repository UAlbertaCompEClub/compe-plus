// Libraries
import React, { FC } from 'react';

// Material UI
import { Grid, Typography, Box, Button, makeStyles } from '@material-ui/core';

// Assets
import PairProgramming from '../assets/pair_programming.svg';
import BlackLogo from '../assets/logo_black.svg';
import LightGreenLogo from '../assets/logo_light_green.svg';
import Practice from '../assets/practice.svg';
import MockInterview from '../assets/mock_interview.svg';
import Industry from '../assets/industry.svg';
import ResumeReview from '../assets/resume_review.svg';
import Teamwork from '../assets/teamwork.svg';
import Support from '../assets/support.svg';
import Wave1 from '../assets/wave_1.svg';
import Wave2 from '../assets/wave_2.svg';
import Wave3 from '../assets/wave_3.svg';
import Wave4 from '../assets/wave_4.svg';

const Landing: FC = () => {
    const classes = useStyles();
    return (
        <Grid container direction='row' justify='center'>
            <Intro />
            <img src={Wave1} className={classes.wave} />
            <Info />
            <img src={Wave2} className={classes.wave} />
            <Values />
            <img src={Wave3} className={classes.wave} />
            <Services />
            <img src={Wave4} className={classes.wave} />
            <Footer />
        </Grid>
    );
};

const Intro: FC = () => {
    const classes = useStyles();

    return (
        <>
            <Grid container item className={classes.wave_pattern} style={{ minHeight: '60vh' }}>
                <Grid container item justify='center' spacing={5}>
                    <Grid container item xs={4} alignItems='center'>
                        <Grid item>
                            <Box maxWidth='sm'>
                                <img src={BlackLogo} className={classes.logo_1} />
                            </Box>
                            <Typography variant='h1'>CompE+</Typography>
                            <Typography variant='h3'>Practice, Insight, and Support</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={5} alignItems='center' justify='center'>
                        <img src={PairProgramming} className={classes.svg} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item justify='center' className={classes.wave_pattern}>
                <Grid container item xs={10} justify='center'>
                    <Typography variant='h3' style={{ fontWeight: 50 }}>
                        CompE+ is a student-led pilot program to provide support for computer engineering students looking for internships
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

const Info: FC = () => {
    const classes = useStyles();
    return (
        <Grid container item style={{ height: '100vh' }} xs={10}>
            <Grid container item justify='center'>
                <Grid container item alignItems='center'>
                    <Grid item>
                        <Typography component='h2' variant='h1' noWrap>
                            What’s CompE+ ?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component='h2' variant='body1'>
                            CompE+ is a student led pilot program to provide CompE students with practice, insight, and support when finding internships in the tech industry. Arguably, computer
                            engineering is a unique discipline and requires different resources and support - that’s where CompE+ comes in!{' '}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component='h2' variant='body1'>
                            The CompE+ pilot program is currently under development and is slated to launch Fall 2021 for the Summer 2022 recruitment. The program will run from September - October
                            2021.{' '}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component='h2' variant='body1' style={{ fontWeight: 600 }}>
                            Currently looking for volunteers: Resume Reviewers and Interviewers!
                        </Typography>
                        <Typography component='h2' variant='body1' style={{ fontWeight: 600 }}>
                            Contact external@compeclub.com{' '}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={3} alignItems='center' justify='center'>
                    <img src={BlackLogo} className={classes.logo_2} />
                </Grid>
            </Grid>
        </Grid>
    );
};

const Values: FC = () => {
    const classes = useStyles();

    return (
        <Grid container item style={{ height: '100vh' }} className={classes.wave_pattern} justify='center'>
            <Grid container item xs={10}>
                <Grid container item>
                    <Typography variant='h1'>Values</Typography>
                </Grid>
                <Grid container item spacing={5}>
                    <Grid container item xs={3} className={classes.values}>
                        <img src={Practice} className={classes.svg} />
                    </Grid>
                    <Grid container item xs={9} alignItems='center'>
                        <Typography variant='h2'>
                            Practice
                            <Typography variant='body1'>
                                Technical interviews can be difficult and requires a good amount of practice. By providing resources and services, CompE+ can help computer engineering students tackle
                                the technical interview with greater confidence
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid container item xs={9} alignItems='center'>
                        <Typography align='right' variant='h2'>
                            Insight
                            <Typography align='right' variant='body1'>
                                The tech industry can be a black box to new students. CompE+ strives to provide insight into the industry by sharing the internship experience with all computer
                                engineering students
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid container item xs={3} className={classes.values}>
                        <img src={Industry} className={classes.svg} />
                    </Grid>
                </Grid>
                <Grid container item spacing={5}>
                    <Grid container item xs={3} className={classes.values}>
                        <img src={Support} className={classes.svg} />
                    </Grid>
                    <Grid container item xs={9} alignItems='center'>
                        <Typography variant='h2'>
                            Support{' '}
                            <Typography variant='body1'>
                                Entering the tech industry can be intimidating to many, even after landing the first internship, imposter syndrome can hit hard. Fostering a positive community is an
                                important goal of CompE+
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const Services: FC = () => {
    const classes = useStyles();

    return (
        <Grid container item style={{ height: '100vh' }} xs={10}>
            <Grid container item>
                <Typography variant='h1'>Services</Typography>
            </Grid>
            <Grid container item spacing={2}>
                <Grid container item xs={12} spacing={3}>
                    <Grid container item xs={4} justify='center'>
                        <img src={ResumeReview} className={classes.services_svg} />
                    </Grid>
                    <Grid container item xs={4} justify='center'>
                        <img src={MockInterview} className={classes.services_svg} />
                    </Grid>
                    <Grid container item xs={4} justify='center'>
                        <img src={Teamwork} className={classes.services_svg} />
                    </Grid>
                </Grid>

                <Grid container item xs={12} spacing={3}>
                    <Grid container item xs={4} justify='center'>
                        <Typography variant='h2'>Resume Review</Typography>
                    </Grid>
                    <Grid container item xs={4} justify='center'>
                        <Typography variant='h2'>Mock Interviews</Typography>
                    </Grid>
                    <Grid container item xs={4} justify='center'>
                        <Typography variant='h2'>Community</Typography>
                    </Grid>
                </Grid>

                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={4}>
                        <Typography align='center' variant='body1'>
                            Gain confidence when writing resumes by getting your resume reviewed by senior CompE students to gain key insight on how to properly format and develop your resume
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align='center' variant='body1'>
                            Led by senior CompE students, practice communicating your thoughts and problem-solving skills with mock technical interviews
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align='center' variant='body1'>
                            Connect with other CompE students, gain insight on different companies that other students have worked for, and learn more about the tech industry
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const Footer: FC = () => {
    const classes = useStyles();

    return (
        <Grid container item className={classes.footer}>
            <Grid container item className={classes.wave_pattern} justify='center' direction='column' alignItems='center'>
                <img src={LightGreenLogo} className={classes.footer_logo} />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    wave_pattern: {
        backgroundColor: theme.palette.primary.main,
    },
    svg: {
        width: '90%',
        height: 'auto',
    },
    wave: {
        width: '100%',
        height: 'auto',
    },
    values: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    services_svg: {
        width: '80%',
        height: 'auto',
    },
    logo_2: {
        width: '60%',
        height: 'auto',
    },
    logo_1: {
        width: '50%',
        height: 'auto',
    },
    footer: {
        padding: '0',
    },
    footer_logo: {
        width: '3%',
        height: 'auto',
        margin: '1em',
    },
}));

export default Landing;
