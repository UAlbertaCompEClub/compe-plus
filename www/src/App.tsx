import './App.css';

import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header, Section } from './components/Header';
import Community from './routes/Community';
import Landing from './routes/Landing';
import MockInterview from './routes/MockInterview';
import ResumeReview from './routes/ResumeReview';
import theme from './styles/theme';
import { COMMUNITY, COMMUNITY_ROUTE, COMPE_CLUB, COMPE_CLUB_ROUTE, COMPE_PLUS, MOCK_INTERVIEW, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW, RESUME_REVIEW_ROUTE } from './util/constants';

const header_sections: Section[] = [
    { title: RESUME_REVIEW, url: RESUME_REVIEW_ROUTE },
    { title: MOCK_INTERVIEW, url: MOCK_INTERVIEW_ROUTE },
    { title: COMMUNITY, url: COMMUNITY_ROUTE },
    { title: COMPE_CLUB, url: COMPE_CLUB_ROUTE },
];

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} style={{ padding: 0 }}>
                <Header sections={header_sections} title={COMPE_PLUS} />
                <Router>
                    <Switch>
                        <Route path='/resume-review'>
                            <ResumeReview />
                        </Route>
                        <Route path='/mock-interview'>
                            <MockInterview />
                        </Route>
                        <Route path='/community'>
                            <Community />
                        </Route>
                        <Route path='/'>
                            <Landing />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </ThemeProvider>
    );
};

export default App;
