import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AdminDispatch, AdminState } from './adminStore';

export const useAdminDispatch = (): AdminDispatch => useDispatch<AdminDispatch>();
export const useAdminSelector: TypedUseSelectorHook<AdminState> = useSelector;
