import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import volunteerStore from '../redux/substores/volunteeer/volunteerStore';
import { COMMUNITY_ROUTE, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW_ROUTE } from '../util/constants';
import Landing from './unauthenticated/Landing';
import MockInterview from './volunteer/MockInterview';
import ResumeReview from './volunteer/ResumeReview';

const VolunteerApp: FC = () => {
    return (
        <Provider store={volunteerStore}>
            <Switch>
                <Route path={RESUME_REVIEW_ROUTE}>
                    <ResumeReview />
                </Route>
                <Route path={MOCK_INTERVIEW_ROUTE}>
                    <MockInterview />
                </Route>
                <Route path={COMMUNITY_ROUTE}>
                    <p>🚧 Work in progress 🚧</p>
                </Route>
                <Route path='/'>
                    <Landing />
                </Route>
            </Switch>
        </Provider>
    );
};

export default VolunteerApp;
