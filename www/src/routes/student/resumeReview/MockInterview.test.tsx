import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { SubsetUserState } from '../../../contexts/UserContext';
import useUserContext from '../../../hooks/useUserContext';
import { useStudentSelector } from '../../../redux/substores/student/studentHooks';
import testConstants from '../../../util/testConstants';
import MockInterview from '../MockInterview';

jest.mock('../../../hooks/useUserContext');
const mockUseUserContext = mocked(useUserContext, true);

jest.mock('../../../redux/substores/student/studentHooks');
const mockUseStudentSelector = mocked(useStudentSelector, true);

describe('MockInterview', () => {
    beforeEach(() => {
        mockUseStudentSelector.mockReturnValue(testConstants.studentState);
    });

    it('disables the submit button when user has not agreed to terms of service', () => {
        mockUseUserContext.mockReturnValueOnce({
            hasAgreedToTermsOfService: false,
        } as SubsetUserState);

        const result = shallow(<MockInterview />);
        expect(result.find(Button)).toHaveLength(0);
    });

    it('disables the text field when user has not agreed to terms of service', () => {
        mockUseUserContext.mockReturnValueOnce({
            hasAgreedToTermsOfService: false,
        } as SubsetUserState);

        const result = shallow(<MockInterview />);
        expect(result.find(TextField)).toHaveLength(0);
    });
});
