import { shallow } from 'enzyme';
import React from 'react';

import ResumeReview from './ResumeReview';

describe('StudentResumeReview', () => {
    it('renders correctly', () => {
        const result = shallow(<ResumeReview />);

        expect(result).toMatchSnapshot();
    });
});
