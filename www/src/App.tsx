import React, { FC } from 'react';
import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';

import AuthButton from './components/auth/AuthButton';
import logo from './logo.svg';
import './App.css';

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
                {isAuthenticated && <button onClick={async () => requestWithToken(getAccessTokenSilently)} />}
                <AuthButton />
            </header>
        </div>
    );
};

export default App;
