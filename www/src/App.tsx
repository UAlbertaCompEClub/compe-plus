import React, { FC } from 'react';
import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';

import AuthButton from './components/auth/AuthButton';
import logo from './logo.svg';
import './App.css';
import { Container } from '@material-ui/core';
// Libraries
import React from 'react';

// Material UI
import { Box, Container, CssBaseline, ThemeProvider } from '@material-ui/core';

// Components
import { Landing } from './routes/Landing';

// Styles
import theme from './theme';
import { Header, Section } from './components/Header';
import { ABOUT, COMMUNITY, COMPE_PLUS, MOCK_INTERVIEW, RESUME_REVIEW } from './constants';

const header_sections: Section[] = [
    { title: ABOUT, url: '#' },
    { title: RESUME_REVIEW, url: '#' },
    { title: MOCK_INTERVIEW, url: '#' },
    { title: COMMUNITY, url: '#' },
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
                <Landing />
            </Container>
        </ThemeProvider>
    );
};

export default App;
