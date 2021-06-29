import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header, Section } from './components/Header';
import { useAppSelector } from './redux/hooks';
import adminStore from './redux/substores/admin/adminStore';
import studentStore from './redux/substores/student/studentStore';
import volunteerStore from './redux/substores/volunteeer/volunteerStore';
import Community from './routes/Community';
import Landing from './routes/Landing';
import MobileLanding from './routes/MobileLanding';
import MockInterview from './routes/MockInterview';
import ResumeReview from './routes/ResumeReview';
import theme from './styles/theme';
import { COMMUNITY, COMMUNITY_ROUTE, COMPE_CLUB, COMPE_CLUB_ROUTE, COMPE_PLUS, MOCK_INTERVIEW, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW, RESUME_REVIEW_ROUTE } from './util/constants';

const header_sections: Section[] = [
    // { title: RESUME_REVIEW, url: RESUME_REVIEW_ROUTE },
    // { title: MOCK_INTERVIEW, url: MOCK_INTERVIEW_ROUTE },
    // { title: COMMUNITY, url: COMMUNITY_ROUTE },
];

const StudentApp: FC = () => {
    return (
        <Provider store={studentStore}>
            <Router>
                <Switch>
                    <Route path={RESUME_REVIEW_ROUTE}>
                        <ResumeReview />
                    </Route>
                    <Route path={MOCK_INTERVIEW_ROUTE}>
                        <MockInterview />
                    </Route>
                    <Route path={COMMUNITY_ROUTE}>
                        <Community />
                    </Route>
                    <Route path='/'>
                        <Landing />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
};

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

    const content = getContentByRole(currentRole);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} style={{ padding: 0 }}>
                <Header sections={header_sections} title={COMPE_PLUS} />
                <BrowserView>{content}</BrowserView>
                <MobileView>
                    <MobileLanding />
                </MobileView>
            </Container>
        </ThemeProvider>
    );
};

export default App;
