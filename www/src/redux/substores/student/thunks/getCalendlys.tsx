import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { getCalendlys as endpoint } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedCalendlys } from '../../../../util/serverResponses';
import { StudentDispatch, StudentState } from '../studentStore';

export type GetCalendlysParams = {
    tokenAcquirer: TokenAcquirer;
    intervieweeId: string;
};

type AsyncThunkConfig = {
    state: StudentState;
    dispatch: StudentDispatch;
    rejectValue: string;
};

type Output = WrappedCalendlys & { intervieweeId: string };

export const getCalendlys = async (params: GetCalendlysParams): Promise<Output> => {
    const calendlysResult = await fetchWithToken<WrappedCalendlys>(endpoint, params.tokenAcquirer, [Scope.ReadCalendlys]).catch(() => {
        throw new Error('Unable to fetch calendlys');
    });

    return calendlysResult ? { ...calendlysResult.data, intervieweeId: params.intervieweeId } : { calendlys: [], intervieweeId: '' };
};

export default createAsyncThunk<Output, GetCalendlysParams, AsyncThunkConfig>('mockInterview/getCalendlys', (params, thunkApi) => {
    try {
        return getCalendlys(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e as string);
    }
});
