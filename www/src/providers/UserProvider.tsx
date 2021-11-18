import React, { FC, ReactNode } from 'react';

import UserContext from '../contexts/UserContext';
import { useAppSelector } from '../redux/hooks';

type UserProviderProps = {
    children: ReactNode;
};

const UserProvider: FC<UserProviderProps> = ({ children }: UserProviderProps) => {
    const user = useAppSelector((state) => state.user);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
