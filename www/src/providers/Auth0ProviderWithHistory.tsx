import { AppState, Auth0Provider } from '@auth0/auth0-react';
import React, { FC, PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';

import config from '../util/config';

type Auth0ProviderWithHistoryProps = unknown;

const Auth0ProviderWithHistory: FC<Auth0ProviderWithHistoryProps> = ({ children }: PropsWithChildren<Auth0ProviderWithHistoryProps>) => {
    const { domain, clientId } = config.auth0;

    const history = useHistory();

    const onRedirectCallback = (appState: AppState) => {
        /// Redirect URI must be listed in Auth0 application
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin} onRedirectCallback={onRedirectCallback} audience={config.server.audience}>
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
