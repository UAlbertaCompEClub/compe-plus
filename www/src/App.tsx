// Libraries
import React, { FC } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// Material UI
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';

// Components and Routes
import { Header, Section } from './components/Header';
import Landing from './routes/Landing';
import ResumeReview from './routes/ResumeReview';
import MockInterview from './routes/MockInterview';
import Community from './routes/Community';

// Styles
import theme from './styles/theme';

// Constants
import { COMPE_PLUS } from './util/constants';

import { BrowserView, MobileView } from 'react-device-detect';
import MobileLanding from './routes/MobileLanding';

const header_sections: Section[] = [
    // { title: RESUME_REVIEW, url: RESUME_REVIEW_ROUTE },
    // { title: MOCK_INTERVIEW, url: MOCK_INTERVIEW_ROUTE },
    // { title: COMMUNITY, url: COMMUNITY_ROUTE },
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
