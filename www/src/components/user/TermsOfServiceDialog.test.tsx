import Dialog from '@material-ui/core/Dialog';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { openTermsOfServiceDialog } from '../../redux/slices/userSlice';
import { AppDispatch, RootState } from '../../redux/store';
import testConstants from '../../util/testConstants';
import TermsOfServiceDialog from './TermsOfServiceDialog';

jest.mock('../../redux/hooks');
const mockUseAppDispatch = mocked(useAppDispatch, true);
const mockUseAppSelector = mocked(useAppSelector, true);

let mockDispatch: jest.MockedFunction<AppDispatch>;
let mockGlobalStore: RootState;

beforeEach(() => {
    mockDispatch = jest.fn();
    mockUseAppDispatch.mockReturnValue(mockDispatch);

    mockGlobalStore = testConstants.globalState;
    mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));
});

it("calls closeTermsOfServiceDialog when 'Cancel' is clicked", () => {
    const result = shallow(<TermsOfServiceDialog />);

    const onClickHandler = result
        .findWhere((c) => c.text() === 'Cancel')
        .first()
        .prop('onClick');

    onClickHandler();

    expect(mockDispatch).toBeCalledWith(openTermsOfServiceDialog());
});

it('displays the dialog when the isTermsOfServiceDialogOpen field is true', () => {
    mockGlobalStore.user.isTermsOfServiceDialogOpen = true;
    mockUseAppSelector.mockImplementationOnce((selector) => selector(mockGlobalStore));

    const result = shallow(<TermsOfServiceDialog />).find(Dialog);

    expect(result.prop('open')).toBe(true);
});
