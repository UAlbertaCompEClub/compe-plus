import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import adminStore from '../redux/substores/admin/adminStore';
import { COMMUNITY_ROUTE, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW_ROUTE } from '../util/constants';
import MockInterview from './admin/MockInterview';
import ResumeReview from './admin/ResumeReview';
import Community from './Community';
import Landing from './unauthenticated/Landing';

const AdminApp: FC = () => {
    return (
        <Provider store={adminStore}>
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
        </Provider>
    );
};

export default AdminApp;
