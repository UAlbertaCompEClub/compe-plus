import { createContext } from 'react';

export type SubsetUserState = {
    roles: string[];
    currentRole: string;
    hasAgreedToTermsOfService: boolean | null;
};

const UserContext = createContext<SubsetUserState | null>(null);

export default UserContext;
