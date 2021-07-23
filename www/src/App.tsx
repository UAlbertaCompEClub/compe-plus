import { useAuth0 } from '@auth0/auth0-react';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header, Section } from './components/Header';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserRegistration } from './redux/slices/userSlice';
import adminStore from './redux/substores/admin/adminStore';
import volunteerStore from './redux/substores/volunteeer/volunteerStore';
import MobileLanding from './routes/MobileLanding';
import StudentApp from './routes/Student';
import UnauthenticatedApp from './routes/Unauthenticated';
import theme from './styles/theme';
import { COMMUNITY, COMMUNITY_ROUTE, COMPE_PLUS, MOCK_INTERVIEW, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW, RESUME_REVIEW_ROUTE } from './util/constants';

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

    const { isAuthenticated } = useAuth0();
    const dispatch = useAppDispatch();
    const content = isAuthenticated ? getContentByRole(currentRole) : <UnauthenticatedApp />;

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(checkUserRegistration());
        }
    }, [isAuthenticated]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} style={{ padding: 0 }}>
                <Router>
                    <Header sections={header_sections} title={COMPE_PLUS} />
                    <BrowserView>{content}</BrowserView>
                    <MobileView>
                        <MobileLanding />
                    </MobileView>
                </Router>
            </Container>
        </ThemeProvider>
    );
};

export default App;
