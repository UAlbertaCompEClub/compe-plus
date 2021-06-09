import { useAuth0 } from '@auth0/auth0-react';
import React, { FC } from 'react';

const Community: FC = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <div>Community (logged in!!)</div> : <div>Community (not logged in!!)</div>;
};

export default Community;
