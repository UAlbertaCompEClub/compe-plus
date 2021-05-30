import React, { FC } from 'react';
import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';

import AuthButton from './components/auth/AuthButton';
import logo from './logo.svg';
import './App.css';
import { Container } from '@material-ui/core';
// Libraries
import React from 'react';

// Material UI
import { ThemeProvider } from '@material-ui/core';

// Components
import { Landing } from './routes/Landing';

// Styles
import theme from './theme';

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
            <Landing />
        </ThemeProvider>
    );
};

export default App;
