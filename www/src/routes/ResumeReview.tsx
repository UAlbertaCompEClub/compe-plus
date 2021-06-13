import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ResumeReview: FC = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <div>ResumeReview (logged in!!)</div> : <div>ResumeReview (not logged in!!)</div>;
};

export default ResumeReview;
