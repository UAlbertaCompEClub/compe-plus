import React, { FC } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks';
import { COMMUNITY_ROUTE, MOCK_INTERVIEW_ROUTE, REGISTER_ROUTE, RESUME_REVIEW_ROUTE } from '../util/constants';
import Register from './student/Register';
import Community from './unauthenticated/Community';
import Landing from './unauthenticated/Landing';
import MockInterview from './unauthenticated/MockInterview';
import ResumeReview from './unauthenticated/ResumeReview';

const UnauthenticatedApp: FC = () => {
    const history = useHistory();

    const { hasRegistered } = useAppSelector((state) => state.user);

    if (hasRegistered === false) {
        history.push(REGISTER_ROUTE);
    }

    return (
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
            <Route path={REGISTER_ROUTE}>
                <Register />
            </Route>
            <Route path='/'>
                <Landing />
            </Route>
        </Switch>
    );
};

export default UnauthenticatedApp;
