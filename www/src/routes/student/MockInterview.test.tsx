import Link from '@material-ui/core/Link';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { SubsetUserState } from '../../contexts/UserContext';
import useUserContext from '../../hooks/useUserContext';
import { useStudentSelector } from '../../redux/substores/student/studentHooks';
import testConstants from '../../util/testConstants';
import MockInterview from './MockInterview';

jest.mock('../../hooks/useUserContext');
const mockUseUserContext = mocked(useUserContext, true);

jest.mock('../../redux/substores/student/studentHooks');
const mockUseStudentSelector = mocked(useStudentSelector, true);

describe('MockInterview', () => {
    beforeEach(() => {
        mockUseStudentSelector.mockReturnValue(testConstants.studentState);
    });

    it('hides the calendly link when user has not agreed to terms of service', () => {
        mockUseUserContext.mockReturnValueOnce({
            hasAgreedToTermsOfService: false,
        } as SubsetUserState);

        const result = shallow(<MockInterview />);
        expect(result.find(Link)).toHaveLength(0);
    });
});
