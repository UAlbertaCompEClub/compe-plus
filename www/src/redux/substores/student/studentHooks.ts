import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { StudentDispatch, StudentState } from './studentStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useStudentDispatch = () => useDispatch<StudentDispatch>();
export const useStudentSelector: TypedUseSelectorHook<StudentState> = useSelector;
