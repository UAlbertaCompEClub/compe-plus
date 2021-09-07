import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import studentStore from '../redux/substores/student/studentStore';
import { COMMUNITY_ROUTE, MOCK_INTERVIEW_ROUTE, RESUME_REVIEW_ROUTE, RESUME_REVIEW_VIEWER_ROUTE } from '../util/constants';
import Community from './Community';
import MockInterview from './student/MockInterview';
import ResumeReview from './student/ResumeReview';
import ResumeReviewViewer from './student/resumeReview/ResumeReviewViewer';
import Landing from './unauthenticated/Landing';

const StudentApp: FC = () => {
    return (
        <Provider store={studentStore}>
            <Switch>
                <Route exact path={RESUME_REVIEW_ROUTE}>
                    <ResumeReview />
                </Route>
                <Route path={RESUME_REVIEW_VIEWER_ROUTE}>
                    <ResumeReviewViewer />
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

export default StudentApp;
