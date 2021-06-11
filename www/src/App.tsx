import React, { FC } from 'react';
import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import AuthButton from './components/auth/AuthButton';
import config from './util/config';
import logo from './logo.svg';
import './App.css';

// TODO: Remove dummy requests
type TokenAcquirer = (options?: GetTokenSilentlyOptions) => Promise<string>;

async function requestWithToken(getAccessTokenSilently: TokenAcquirer) {
    const tokenRequest = {
        audience: config.server.audience,
        scope: 'call:ping',
    };

    try {
        const apiToken = await getAccessTokenSilently(tokenRequest);

        const res = await axios.get(`${config.server.endpoint}/api/secure/v1/ping`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });

        console.debug('Response from server:');
        console.debug(res);
    } catch (e) {
        console.error(e);
    }
}

const App: FC = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                {user && <p>Welcome {user.name}!</p>}
                {isAuthenticated && <button onClick={async () => requestWithToken(getAccessTokenSilently)}>Access server</button>}
                <AuthButton />
            </header>
        </div>
    );
};

export default App;
