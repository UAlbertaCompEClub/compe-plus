import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { COMMUNITY_ROUTE, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW_ROUTE } from '../util/constants';
import Community from './Community';
import Landing from './Landing';
import MockInterview from './MockInterview';
import ResumeReview from './unauthenticated/ResumeReview';

const UnauthenticatedApp: FC = () => {
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
            <Route path='/'>
                <Landing />
            </Route>
        </Switch>
    );
};

export default UnauthenticatedApp;
