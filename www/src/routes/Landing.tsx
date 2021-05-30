// Libraries
import React, { FC } from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Assets
import PairProgramming from '../assets/undraw_pair_programming_njlp.svg';
import logo from '../assets/logo_black.svg';

// Components
import { Section, Header } from '../components/Header';

// Constants
import { ABOUT, RESUME_REVIEW, MOCK_INTERVIEW, COMMUNITY, COMPE_PLUS } from '../constants';
import { makeStyles } from '@material-ui/core';

const header_sections: Section[] = [
    { title: ABOUT, url: '#' },
    { title: RESUME_REVIEW, url: '#' },
    { title: MOCK_INTERVIEW, url: '#' },
    { title: COMMUNITY, url: '#' },
];

export const Landing: FC = () => {
    const classes = useStyles();
    return (
        <Container maxWidth={false} style={{ padding: 0, height: '100%' }}>
            <Header sections={header_sections} title={COMPE_PLUS} />
            <Grid container spacing={1} style={{ padding: 0, height: '100%' }}>
                <Grid container item xs={4}>
                    <Grid container item xs={12} style={{ justifyContent: 'center', alignItems: 'left', display: 'flex' }} direction="column">
                        <Grid item>
                            <img src={logo} className={classes.logo} />
                            <Typography variant="h1">CompE+</Typography>
                            <Typography variant="h3">Practice, Insight, and Support</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={8} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <img src={PairProgramming} className={classes.pairProgramming} />
                </Grid>
                <Grid container item xs={12} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <Typography component="h2" variant="h2" align="center" noWrap>
                        CompE+ is a student-led pilot program to provide support computer engineering students looking for internships
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    pairProgramming: {
        width: 650,
        height: 420,
        margin: 5,
    },
    logo: {
        width: 100,
        height: 100,
        margin: 5,
    },
}));
