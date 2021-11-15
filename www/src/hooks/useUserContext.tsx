import { useContext } from 'react';

import UserContext, { SubsetUserState } from '../contexts/UserContext';

const useUserContext = (): SubsetUserState | null => useContext(UserContext);

export default useUserContext;
