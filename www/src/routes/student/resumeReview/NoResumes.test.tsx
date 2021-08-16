import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import { StudentState } from '../../../redux/substores/student/studentStore';
import testConstants from '../../../util/testConstants';
import NoResumes from './NoResumes';

jest.mock('../../../redux/substores/student/studentHooks');
const useStudentDispatchMock = mocked(useStudentDispatch, true);
const useStudentSelectorMock = mocked(useStudentSelector, true);

describe('NoResumes', () => {
    const dispatchMock = jest.fn();
    let studentStateMock: StudentState;

    beforeEach(() => {
        studentStateMock = testConstants.studentStateMock;
        useStudentDispatchMock.mockReturnValue(dispatchMock);
        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));
    });

    it('renders correctly', () => {
        const result = shallow(<NoResumes />);

        expect(result.text()).toContain('You have no resumes submitted');
        expect(result.text()).toContain('Submit resume');
    });
});
