import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import studentStore from '../redux/substores/student/studentStore';
import { COMMUNITY_ROUTE, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW_ROUTE } from '../util/constants';
import ResumeReview from './student/ResumeReview';
import Landing from './unauthenticated/Landing';

const StudentApp: FC = () => {
    return (
        <Provider store={studentStore}>
            <Switch>
                <Route path={RESUME_REVIEW_ROUTE}>
                    <ResumeReview />
                </Route>
                <Route path={MOCK_INTERVIEW_ROUTE}>
                    <p>🚧 Work in progress 🚧</p>
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

export default StudentApp;
