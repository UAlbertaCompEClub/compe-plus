import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useEffect } from 'react';

import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import getMyResumeReviews from '../../../redux/substores/student/thunks/getMyResumeReviews';
import NoResumes from './NoResumes';

const ResumeList: FC = () => {
    const { resumeReviews } = useStudentSelector((state) => state.resumeReview);

    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useStudentDispatch();

    useEffect(() => {
        dispatch(getMyResumeReviews({ tokenAcquirer: getAccessTokenSilently }));
    }, []);

    if (resumeReviews.length === 0) {
        return <NoResumes />;
    }

    return <p>🚧 Work in progress 🚧</p>;
};

export default ResumeList;
