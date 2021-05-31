// Libraries
import React, { FC } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Assets
import PairProgramming from '../assets/undraw_pair_programming_njlp.svg';
import logo from '../assets/logo_black.svg';
import LandingBackground from '../assets/LandingBackground.svg';

// Components
import OutlinedButton from '../components/OutlinedButton';

// Constants
import { makeStyles } from '@material-ui/core';

export const Landing: FC = () => {
    const classes = useStyles();
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

const Intro: FC = () => {
    const classes = useStyles();

    return (
        <Grid container item>
            <Grid container item style={{ height: '100vh' }}>
                <Grid container item xs={5} alignItems='center'>
                    <Grid item>
                        <img src={logo} className={classes.logo} />
                        <Typography variant='h1'>CompE+</Typography>
                        <Typography variant='h3'>Practice, Insight, and Support</Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={7} alignItems='center' justify='center'>
                    <img src={PairProgramming} className={classes.pairProgramming} />
                </Grid>
                <Grid container item xs={12} justify='center'>
                    <Grid container item alignItems='center' justify='center' direction='column' spacing={3}>
                        <Grid item>
                            <Typography component='h2' variant='h2' align='center'>
                                CompE+ is a student-led pilot program to provide support for computer engineering students looking for internships
                            </Typography>
                        </Grid>
                        <Grid item>
                            <OutlinedButton title={'Get Started'} url={'#'} />
                        </Grid>
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
                    <img src={logo} className={classes.logo2} />
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
            <Grid container item>
                <Grid container item xs={3} justify='center' alignItems='center'>
                    <img src={logo} className={classes.logo} />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant='h2'>Practice</Typography>
                    <Typography variant='body1'>
                        Technical interviews can be difficult and requires a good amount of practice. By providing resources and services, CompE+ can help computer engineering students tackle the
                        technical interview with greater confidence
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={9}>
                    <Typography align='right' variant='h2'>
                        Insight
                    </Typography>
                    <Typography align='right' variant='body1'>
                        The tech industry can be a black box to new students. CompE+ strives to provide insight into the industry by sharing the internship experience with all computer engineering
                        students
                    </Typography>
                </Grid>
                <Grid container item xs={3} justify='center' alignItems='center'>
                    <img src={logo} className={classes.logo} />
                </Grid>
            </Grid>
            <Grid container item>
                <Grid container item xs={3} justify='center' alignItems='center'>
                    <img src={logo} className={classes.logo} />
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
                        <img src={logo} className={classes.logo} />
                    </Grid>
                    <Grid container item xs={4} justify='center'>
                        <img src={logo} className={classes.logo} />
                    </Grid>
                    <Grid container item xs={4} justify='center'>
                        <img src={logo} className={classes.logo} />
                    </Grid>
                </Grid>

                <Grid container item xs={12} spacing={3}>
                    <Grid container item xs={4} justify='center'>
                        <Typography variant='h2'>Mock Interviews</Typography>
                    </Grid>
                    <Grid container item xs={4} justify='center'>
                        <Typography variant='h2'>Resume Review</Typography>
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

const useStyles = makeStyles((theme) => ({
    pairProgramming: {
        width: 680,
        height: 460,
    },
    logo: {
        width: 100,
        height: 100,
        margin: 0,
    },
    logo2: {
        width: 300,
        height: 300,
    },
}));
