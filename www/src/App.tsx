import { useAuth0 } from '@auth0/auth0-react';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import { Header, Section } from './components/Header';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import adminStore from './redux/substores/admin/adminStore';
import volunteerStore from './redux/substores/volunteeer/volunteerStore';
import checkUserRegistration from './redux/thunks/checkUserRegistration';
import MobileLanding from './routes/MobileLanding';
import StudentApp from './routes/Student';
import UnauthenticatedApp from './routes/Unauthenticated';
import theme from './styles/theme';
import { COMMUNITY, COMMUNITY_ROUTE, COMPE_PLUS, MOCK_INTERVIEW, MOCK_INTERVIEW_ROUTE, REGISTER_ROUTE, RESUME_REVIEW, RESUME_REVIEW_ROUTE } from './util/constants';

const header_sections: Section[] = [
    { title: RESUME_REVIEW, url: RESUME_REVIEW_ROUTE },
    { title: MOCK_INTERVIEW, url: MOCK_INTERVIEW_ROUTE },
    { title: COMMUNITY, url: COMMUNITY_ROUTE },
];

const VolunteerApp: FC = () => {
    // TODO: Update components accordingly
    return (
        <Provider store={volunteerStore}>
            <p>🚧 Work in progress 🚧</p>
        </Provider>
    );
};

const AdminApp: FC = () => {
    // TODO: Update components accordingly
    return (
        <Provider store={adminStore}>
            <p>🚧 Work in progress 🚧</p>
        </Provider>
    );
};

const getContentByRole = (role: string) => {
    switch (role) {
        case 'admin':
            return <AdminApp />;
        case 'reviewer':
        case 'interviewer':
            return <VolunteerApp />;
        default:
            return <StudentApp />;
    }
};

const App: FC = () => {
    const currentRole = useAppSelector((state) => state.user.currentRole);
    const isUserRegistered = useAppSelector((state) => state.user.hasRegistered);
    const isLoadingUser = useAppSelector((state) => state.user.isLoading);

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const dispatch = useAppDispatch();
    const content = isAuthenticated ? getContentByRole(currentRole) : <UnauthenticatedApp />;

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(checkUserRegistration(getAccessTokenSilently));
        }
    }, [isAuthenticated]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} style={{ padding: 0 }}>
                <Router>
                    <Header sections={header_sections} title={COMPE_PLUS} />
                    <BrowserView>
                        {content}
                        {!isLoadingUser && isUserRegistered === false && <Redirect to={REGISTER_ROUTE} />}
                    </BrowserView>
                    <MobileView>
                        <MobileLanding />
                    </MobileView>
                </Router>
            </Container>
        </ThemeProvider>
    );
};

export default App;
