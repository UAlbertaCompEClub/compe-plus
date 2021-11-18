import { shallow } from 'enzyme';
import React from 'react';
import * as ReactDropzone from 'react-dropzone';
import { mocked } from 'ts-jest/utils';

import PDFViewer from '../../../components/pdf/PDFViewer';
import { SubsetUserState } from '../../../contexts/UserContext';
import useUserContext from '../../../hooks/useUserContext';
import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import { StudentState } from '../../../redux/substores/student/studentStore';
import testConstants from '../../../util/testConstants';
import UploadResume from './UploadResume';

jest.mock('../../../redux/substores/student/studentHooks');
const mockUseStudentDispatch = mocked(useStudentDispatch, true);
const mockUseStudentSelector = mocked(useStudentSelector, true);

jest.mock('../../../hooks/useUserContext');
const mockUseUserContext = mocked(useUserContext, true);

describe('UploadResume', () => {
    const mockDispatch = jest.fn();
    let mockStudentState: StudentState;

    beforeEach(() => {
        mockStudentState = testConstants.studentState;
        mockUseStudentDispatch.mockReturnValue(mockDispatch);
        mockUseStudentSelector.mockImplementation((selector) => selector(mockStudentState));

        jest.clearAllMocks();
    });

    it('renders correctly for input step', () => {
        const result = shallow(<UploadResume />);

        expect(result.find('input')).toHaveLength(1);
        expect(result.find('input').prop('type')).toBe('file');
    });

    it('renders correctly for preview step', () => {
        mockStudentState.uploadResume.document = {
            base64Contents: 'mockbase64encodeddocument',
            name: 'mockdocumentname',
        };
        mockUseStudentSelector.mockImplementation((selector) => selector(mockStudentState));

        const result = shallow(<UploadResume />);

        expect(result.text()).toContain('Ready to upload?');
        expect(result.find(PDFViewer)).toHaveLength(1);
    });

    it('disables the file input when user has not agreed to terms of service', () => {
        mockUseUserContext.mockReturnValueOnce({
            hasAgreedToTermsOfService: false,
        } as SubsetUserState);

        const spy = jest.spyOn(ReactDropzone, 'useDropzone');

        shallow(<UploadResume />);

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                onDrop: expect.any(Function),
                disabled: true,
            }),
        );
    });
});
