import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { VolunteerDispatch, VolunteerState } from './volunteerStore';

export const useVolunteerDispatch = (): VolunteerDispatch => useDispatch<VolunteerDispatch>();
export const useVolunteerSelector: TypedUseSelectorHook<VolunteerState> = useSelector;
