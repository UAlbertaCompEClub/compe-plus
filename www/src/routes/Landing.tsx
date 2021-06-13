// Libraries
import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Material UI
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Box, Button } from '@material-ui/core';

// Assets
import PairProgramming from '../assets/pair_programming.svg';
import LandingBackground from '../assets/LandingBackground.svg';
import BlackLogo from '../assets/logo_black.svg';
import Practice from '../assets/practice.svg';
import MockInterview from '../assets/mock_interview.svg';
import Industry from '../assets/industry.svg';
import ResumeReview from '../assets/resume_review.svg';
import Teamwork from '../assets/teamwork.svg';
import Support from '../assets/support.svg';

const Landing: FC = () => {
    return (
        <Grid container direction='row' justify='center' style={{ backgroundImage: `url(${LandingBackground})`, backgroundSize: 'cover', paddingBottom: 80 }}>
            <Grid container item spacing={10} xs={10}>
                <Intro />
                <Values />
                <Services />
            </Grid>
        </Grid>
    );
};

export const Intro: FC = () => {
    const classes = useStyles();
    const { isAuthenticated } = useAuth0();

    return (
        <Grid container item>
            <Grid container item style={{ height: '100vh' }}>
                <Grid container item xs={5} alignItems='center'>
                    <Grid item>
                        <Box maxWidth='sm'>
                            <img src={BlackLogo} className={classes.logo_1} />
                        </Box>
                        <Typography variant='h1'>CompE+</Typography>
                        <Typography variant='h3'>Practice, Insight, and Support</Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={7} alignItems='center' justify='center'>
                    <Box maxWidth='sm'>
                        <img src={PairProgramming} className={classes.svg} />
                    </Box>
                </Grid>
                <Grid container item xs={12} justify='center'>
                    <Grid container item alignItems='center' justify='center' direction='column' spacing={3}>
                        <Grid item>
                            <Typography component='h2' variant='h2' align='center'>
                                CompE+ is a student-led pilot program to provide support for computer engineering students looking for internships
                            </Typography>
                        </Grid>
                        {!isAuthenticated && (
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={() => console.log('clicked Get Started button')}>
                                    {'Get Started'}
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item spacing={10}>
                <Grid container item xs={8} alignItems='center' justify='center'>
                    <Grid item>
                        <Typography component='h2' variant='h1' noWrap>
                            What’s CompE+ ?
                        </Typography>
                        <Typography component='h2' variant='body1'>
                            CompE+ is a student led pilot program to provide CompE students with practice, insight, and support when finding internships in the tech industry. Arguably, computer
                            engineering is a unique discipline and requires different resources and support - that’s where CompE+ comes in!{' '}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={4} alignItems='center' justify='center'>
                    <img src={BlackLogo} className={classes.logo_2} />
                </Grid>
            </Grid>
        </Grid>
    );
};

const Values: FC = () => {
    const classes = useStyles();

    return (
        <Grid container item spacing={8}>
            <Grid container item>
                <Typography variant='h1'>Values</Typography>
            </Grid>
            <Grid container item spacing={5}>
                <Grid container item xs={3} className={classes.values}>
                    <img src={Practice} className={classes.svg} />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant='h2'>Practice</Typography>
                    <Typography variant='body1'>
                        Technical interviews can be difficult and requires a good amount of practice. By providing resources and services, CompE+ can help computer engineering students tackle the
                        technical interview with greater confidence
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item spacing={5}>
                <Grid item xs={9}>
                    <Typography align='right' variant='h2'>
                        Insight
                    </Typography>
                    <Typography align='right' variant='body1'>
                        The tech industry can be a black box to new students. CompE+ strives to provide insight into the industry by sharing the internship experience with all computer engineering
                        students
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
                <Grid item xs={9}>
                    <Typography variant='h2'>Support</Typography>
                    <Typography variant='body1'>
                        Entering the tech industry can be intimidating to many, even after landing the first internship, imposter syndrome can hit hard. Fostering a positive community is an important
                        goal of CompE+
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

const Services: FC = () => {
    const classes = useStyles();

    return (
        <Grid container item spacing={8}>
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
                            Led by senior CompE students, practice communicating your thoughts and problem-solving skills with mock technical interviews
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align='center' variant='body1'>
                            Simulate the application process by getting your resume reviewed by the co-op office followed by a senior compE student to provide a technical perspective
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

const useStyles = makeStyles(() => ({
    svg: {
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
        width: '70%',
        height: 'auto',
    },
    logo_1: {
        width: '50%',
        height: 'auto',
    },
}));

export default Landing;
