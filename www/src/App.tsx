import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header, Section } from './components/Header';
import Community from './routes/Community';
import Landing from './routes/Landing';
import MobileLanding from './routes/MobileLanding';
import MockInterview from './routes/MockInterview';
import ResumeReview from './routes/ResumeReview';
import theme from './styles/theme';
import { COMMUNITY, COMMUNITY_ROUTE, COMPE_PLUS, MOCK_INTERVIEW, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW, RESUME_REVIEW_ROUTE } from './util/constants';

const header_sections: Section[] = [
    { title: RESUME_REVIEW, url: RESUME_REVIEW_ROUTE },
    { title: MOCK_INTERVIEW, url: MOCK_INTERVIEW_ROUTE },
    { title: COMMUNITY, url: COMMUNITY_ROUTE },
];

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} style={{ padding: 0 }}>
                <Header sections={header_sections} title={COMPE_PLUS} />
                <BrowserView>
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
                </BrowserView>
                <MobileView>
                    <MobileLanding />
                </MobileView>
            </Container>
        </ThemeProvider>
    );
};

export default App;
