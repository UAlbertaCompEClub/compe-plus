import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useEffect } from 'react';

import getAvailableResumeReviews from '../../redux/substores/volunteer/thunks/getAvailableResumeReviews';
import getReviewingResumeReviews from '../../redux/substores/volunteer/thunks/getReviewingResumeReviews';
import { useVolunteerDispatch, useVolunteerSelector } from '../../redux/substores/volunteer/volunteerHooks';

const ResumeReview: FC = () => {
    const { availableResumes, reviewingResumes, isLoading } = useVolunteerSelector((state) => state.resumeReview);
    const { getAccessTokenSilently, user } = useAuth0();
    const dispatch = useVolunteerDispatch();

    useEffect(() => {
        dispatch(getAvailableResumeReviews({ tokenAcquirer: getAccessTokenSilently }));
    }, []);

    useEffect(() => {
        if (user?.sub !== undefined) {
            dispatch(getReviewingResumeReviews({ tokenAcquirer: getAccessTokenSilently, userId: user.sub }));
        } else {
            console.error('user.sub is undefined');
        }
    }, []);

    return (
        <>
            <h1>Currently Reviewing</h1>
            {reviewingResumes.map((r) => (
                <p key={r.id}>{r.id}</p>
            ))}
            <h1>Available Resumes</h1>
            <p>It be loading {isLoading ? 'true' : 'false'}.</p>
            {availableResumes.map((r) => (
                <p key={r.id}>{r.id}</p>
            ))}
        </>
    );
};

export default ResumeReview;
