import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import PDFViewer from '../../../components/pdf/PDFViewer';
import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import { StudentState } from '../../../redux/substores/student/studentStore';
import testConstants from '../../../util/testConstants';
import UploadResume from './UploadResume';

jest.mock('../../../redux/substores/student/studentHooks');
const useStudentDispatchMock = mocked(useStudentDispatch, true);
const useStudentSelectorMock = mocked(useStudentSelector, true);

describe('UploadResume', () => {
    const dispatchMock = jest.fn();
    let studentStateMock: StudentState;

    beforeEach(() => {
        studentStateMock = testConstants.studentStateMock;
        useStudentDispatchMock.mockReturnValue(dispatchMock);
        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));
    });

    it('renders correctly for input step', () => {
        const result = shallow(<UploadResume />);

        expect(result.find('input')).toHaveLength(1);
        expect(result.find('input').prop('type')).toBe('file');
    });

    it('renders correctly for preview step', () => {
        studentStateMock.uploadResume.document = 'mockbase64encodeddocument';
        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));

        const result = shallow(<UploadResume />);

        expect(result.text()).toContain('Ready to upload?');
        expect(result.find(PDFViewer)).toHaveLength(1);
    });
});
