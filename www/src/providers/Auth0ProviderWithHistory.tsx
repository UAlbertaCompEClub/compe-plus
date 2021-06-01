import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { AppState, Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory: React.FC = ({ children }) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? '';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? '';

    const history = useHistory();

    const onRedirectCallback = (appState: AppState) => {
        /// Redirect URI must be listed in Auth0 application
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin} onRedirectCallback={onRedirectCallback}>
            {children}
        </Auth0Provider>
    );
};

Auth0ProviderWithHistory.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Auth0ProviderWithHistory;
