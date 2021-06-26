import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { VolunteerDispatch, VolunteerState } from './volunteerStore';

export const useStudentDispatch = (): VolunteerDispatch => useDispatch<VolunteerDispatch>();
export const useStudentSelector: TypedUseSelectorHook<VolunteerState> = useSelector;
