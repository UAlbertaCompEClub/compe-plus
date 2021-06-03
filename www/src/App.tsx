import React, { FC } from 'react';
import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';

import AuthButton from './components/auth/AuthButton';
import logo from './logo.svg';
import './App.css';
import { Container } from '@material-ui/core';
// Libraries
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// Material UI
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';

// Components and Routes
import { Header, Section } from './components/Header';
import { Landing } from './routes/Landing';
import { ResumeReview } from './routes/ResumeReview';
import { MockInterview } from './routes/MockInterview';
import { Community } from './routes/Community';

// Styles
import theme from './styles/theme';

// Constants
import { COMMUNITY, COMPE_PLUS, MOCK_INTERVIEW, RESUME_REVIEW } from './util/constants';

const header_sections: Section[] = [
    { title: RESUME_REVIEW, url: '/resume-review' },
    { title: MOCK_INTERVIEW, url: '/mock-interview' },
    { title: COMMUNITY, url: '/community' },
];

// TODO: Remove dummy requests
type TokenAcquirer = (options?: GetTokenSilentlyOptions) => Promise<string>;

async function requestWithToken(getAccessTokenSilently: TokenAcquirer) {
    console.debug(
        `request with token: ${await getAccessTokenSilently({
            scope: 'reviewer_scope',
        })}`,
    );
}

const App: FC = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

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
