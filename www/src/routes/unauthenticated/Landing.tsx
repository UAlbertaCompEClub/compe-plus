import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

import Industry from '../../assets/industry.svg';
import BlackLogo from '../../assets/logo_black.svg';
import LightGreenLogo from '../../assets/logo_light_green.svg';
import MockInterview from '../../assets/mock_interview.svg';
import PairProgramming from '../../assets/pair_programming.svg';
import Practice from '../../assets/practice.svg';
import ResumeReview from '../../assets/resume_review.svg';
import Support from '../../assets/support.svg';
import Teamwork from '../../assets/teamwork.svg';
import Wave1 from '../../assets/wave_1.svg';
import Wave2 from '../../assets/wave_2.svg';
import Wave3 from '../../assets/wave_3.svg';
import Wave4 from '../../assets/wave_4.svg';
import { Fade } from '../../components/Fade';
import MailChimpForm from '../../components/MailChimpForm';
import useGlobalStyles from '../../styles/style';

const Landing: FC = () => {
    const classes = useStyles();

    return (
        <Grid container direction='row' justify='center' style={{ overflowX: 'hidden' }}>
            <Intro />
            <img src={Wave1} className={classes.wave} />
            <Services />
            <Info />
            <CallToAction />
            <Values />
            <img src={Wave4} className={classes.wave} />
            <Footer />
        </Grid>
    );
};

export const Intro: FC = () => {
    const classes = useStyles();
    const { isAuthenticated } = useAuth0();
    const global = useGlobalStyles();

    return (
        <Grid container item className={classes.wave_pattern} justify='center' style={{ minHeight: '50vh', paddingTop: '10vh' }} id='intro'>
            <Grid container item justify='center' spacing={5}>
                <Grid container item xs={4} alignItems='center' justify='center'>
                    <Grid item>
                        <Box maxWidth='sm'>
                            <img src={BlackLogo} className={classes.logo_1} />
                        </Box>
                        <Typography variant='h1'>CompE+</Typography>
                        <Typography variant='h3'>Resume Review, Mock Interviews, Community</Typography>
                    </Grid>
                </Grid>

                <Grid container item xs={5} alignItems='center' justify='center'>
                    <img src={PairProgramming} className={classes.svg} />
                </Grid>
            </Grid>
            <Grid container item justify='center' alignItems='center' style={{ paddingTop: '5vh' }} spacing={5}>
                <Grid container item justify='center' alignItems='center' spacing={4}>
                    {!isAuthenticated && (
                        <Grid item>
                            <Button size='large' variant='contained' className={global.main_button} onClick={() => window.location.replace('/#call-to-action')}>
                                Get Started!
                            </Button>
                        </Grid>
                    )}
                    <Grid item>
                        <Button size='large' variant='outlined' className={global.secondary_button} onClick={() => window.location.replace('/#services')}>
                            Learn More
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item justify='center' alignItems='center'>
                    <Grid item>
                        <Typography variant='h3' style={{ fontSize: 28 }}>
                            Get the help you need to land your dream internship!
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const Info: FC = () => {
    const global = useGlobalStyles();

    return (
        <Fade>
            <Grid container item style={{ height: '100vh' }} justify='center' id='info'>
                <Grid container item justify='center' alignItems='center' xs={8}>
                    <Grid container item alignItems='center'>
                        <Typography variant='h1'>What’s CompE+ ?</Typography>
                    </Grid>
                    <Grid container item>
                        <Typography variant='body1'>
                            CompE+ is a student led pilot program to provide students with support to find internships in the tech industry. Finding an internship within the tech industry can be
                            difficult and daunting - that’s where CompE+ comes in! CompE+ strives to provide students with services that will aid them on their internship hunt and to provide insight
                            on what it&apos;s like to work in the tech industry.
                        </Typography>
                        <br />
                        <Typography variant='body1'>
                            The CompE+ pilot program is currently under development and is slated to launch Fall 2021 for the Summer 2022 recruitment. The program will run from September - October
                            2021.
                        </Typography>
                    </Grid>
                    <Grid container item justify='center' alignItems='center' direction='column' spacing={5}>
                        <Grid container item justify='center' alignItems='center'>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>
                                We are currently looking for volunteers: Resume Reviewers and Interviewers! <br />
                            </Typography>
                        </Grid>

                        <Grid container item justify='center' alignItems='center' direction='column'>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>
                                If you&apos;re interested:
                            </Typography>
                            <Button size='medium' variant='contained' className={global.main_button} onClick={() => window.location.replace('/#call-to-action')}>
                                Sign up for our mailing list!
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fade>
    );
};

const Values: FC = () => {
    const classes = useStyles();

    return (
        <Fade>
            <Grid container item style={{ height: '100vh' }} justify='center' id='values'>
                <Grid container item alignItems='center' justify='center' xs={8}>
                    <Grid container item alignItems='center'>
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
                                    Technical interviews can be difficult and requires a good amount of practice. By providing resources and services, CompE+ can help computer engineering students
                                    tackle the technical interview with greater confidence
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
                                    Entering the tech industry can be intimidating to many, even after landing the first internship, imposter syndrome can hit hard. Fostering a positive community is
                                    an important goal of CompE+
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fade>
    );
};

const Services: FC = () => {
    const classes = useStyles();

    return (
        <Fade>
            <Grid container item style={{ height: '100vh' }} justify='center' id='services'>
                <Grid container item alignItems='center' justify='center' xs={8}>
                    <Grid container item alignItems='center'>
                        <Typography variant='h1'>Services</Typography>
                    </Grid>
                    <Grid container item spacing={2} alignItems='center' justify='center'>
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
            </Grid>
        </Fade>
    );
};

const CallToAction: FC = () => {
    const classes = useStyles();

    return (
        <>
            <img src={Wave2} className={classes.wave} id='call-to-action' />
            <Grid container item className={`${classes.wave_pattern} `} style={{ minHeight: '50vh' }}>
                <Fade>
                    <Grid container item justify='center' alignItems='center' xs={8} spacing={5}>
                        <Grid container item alignItems='center'>
                            <Grid item>
                                <Typography variant='h1'>Mailing List</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1' style={{ fontWeight: 200 }}>
                                    <br />
                                    CompE+ is still in development 🔧 <br /> Enter your email below to sign up for our mailing list to get up-to-date information on CompE+
                                </Typography>
                            </Grid>
                        </Grid>
                        <MailChimpForm />
                    </Grid>
                </Fade>
            </Grid>
            <img src={Wave3} className={classes.wave} />
        </>
    );
};

const Footer: FC = () => {
    const classes = useStyles();

    return (
        <Grid container item className={classes.footer}>
            <Grid container item className={classes.wave_pattern} justify='center' direction='column' alignItems='center'>
                <Grid container item alignItems='center' justify='center' xs={11}>
                    <Grid container item xs={4} direction='column'>
                        <Grid item>
                            <Typography className={classes.footer_text} align='left'>
                                Contact: external@compeclub.com
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.footer_text} align='left'>
                                In affiliation with the{' '}
                                <Link href='https://www.compeclub.com/' color='inherit' underline='always'>
                                    CompE Club
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} alignItems='center' justify='center'>
                        <img src={LightGreenLogo} className={classes.footer_logo} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.footer_text} align='right'>
                            Curious how we&apos;re building CompE+? Checkout the Github{' '}
                            <Link href='https://github.com/UAlbertaCompEClub/compe-plus' color='inherit' underline='always'>
                                repo
                            </Link>{' '}
                            😎
                        </Typography>
                    </Grid>
                </Grid>
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
    logo_1: {
        width: '50%',
        height: 'auto',
    },
    footer: {
        padding: '0',
    },
    footer_logo: {
        width: '7%',
        height: 'auto',
        margin: '1em',
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
    footer_text: {
        color: theme.palette.primary.light,
        fontSize: 16,
        fontWeight: 400,
    },
}));

export default Landing;
