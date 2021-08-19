import { useAuth0 } from '@auth0/auth0-react';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import { Header, Section } from './components/Header';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import checkUserRegistration from './redux/thunks/checkUserRegistration';
import AdminApp from './routes/Admin';
import StudentApp from './routes/Student';
import UnauthenticatedApp from './routes/Unauthenticated';
import MobileLanding from './routes/unauthenticated/MobileLanding';
import VolunteerApp from './routes/Volunteer';
import theme from './styles/theme';
import { COMMUNITY, COMMUNITY_ROUTE, COMPE_PLUS, MOCK_INTERVIEW, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW, RESUME_REVIEW_ROUTE } from './util/constants';

const header_sections: Section[] = [
    { title: RESUME_REVIEW, url: RESUME_REVIEW_ROUTE },
    { title: MOCK_INTERVIEW, url: MOCK_INTERVIEW_ROUTE },
    { title: COMMUNITY, url: COMMUNITY_ROUTE },
];

const getContentByRole = (role: string) => {
    switch (role) {
        case 'admin':
            return <AdminApp />;
        case 'reviewer':
        case 'interviewer':
            return <VolunteerApp />;
        case 'student':
            return <StudentApp />;
        default:
            return <UnauthenticatedApp />;
    }
};

const App: FC = () => {
    const { currentRole } = useAppSelector((state) => state.user);

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const dispatch = useAppDispatch();
    const content = getContentByRole(currentRole);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(checkUserRegistration(getAccessTokenSilently));
        }
    }, [isAuthenticated]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} style={{ padding: 0, height: '100%' }}>
                <Router>
                    <Header sections={header_sections} title={COMPE_PLUS} />
                    <BrowserView renderWithFragment>{content}</BrowserView>
                    <MobileView>
                        <MobileLanding />
                    </MobileView>
                </Router>
            </Container>
        </ThemeProvider>
    );
};

export default App;
