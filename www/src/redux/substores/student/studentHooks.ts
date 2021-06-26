import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { StudentDispatch, StudentState } from './studentStore';

export const useStudentDispatch = (): StudentDispatch => useDispatch<StudentDispatch>();
export const useStudentSelector: TypedUseSelectorHook<StudentState> = useSelector;
