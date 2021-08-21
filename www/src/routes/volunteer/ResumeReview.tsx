import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useEffect } from 'react';

import getAvailableResumeReviews from '../../redux/substores/volunteer/thunks/getAvailableResumeReviews';
import { useVolunteerDispatch, useVolunteerSelector } from '../../redux/substores/volunteer/volunteerHooks';

const ResumeReview: FC = () => {
    const { availableResumes, reviewingResumes, isLoading } = useVolunteerSelector((state) => state.resumeReview);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useVolunteerDispatch();

    useEffect(() => {
        console.log('do something');
        dispatch(getAvailableResumeReviews({ tokenAcquirer: getAccessTokenSilently }));
        console.log('dispatched');
    }, []);

    return (
        <>
            <h1>Currently Reviewing</h1>
            <h1>Available Resumes</h1>
            <p>It be loading {isLoading ? 'true' : 'false'}.</p>
            {availableResumes.map((r) => (
                <p key={r.id}>{r.id}</p>
            ))}
        </>
    );
};

export default ResumeReview;
