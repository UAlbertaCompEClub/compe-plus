import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { shallow } from 'enzyme';
import React from 'react';

import testConstants from '../../../util/testConstants';
import ResumeReviewCard from './ResumeReviewCard';

it.each(['cancelled', 'finished', 'reviewing', 'seeking_reviewer'])('displays the View button only when a review is not finished', (state) => {
    const mockResumeReview = testConstants.resumeReview1;

    mockResumeReview.state = state as 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';

    const result = shallow(<ResumeReviewCard resumeReview={mockResumeReview} />);

    if (state === 'finished') {
        expect(result.text()).not.toContain('View');
    } else {
        expect(result.text()).toContain('View');
    }
});

it.each(['cancelled', 'finished', 'reviewing', 'seeking_reviewer'])('displays the Cancel button only when a review is still seeking a reviewer', (state) => {
    const mockResumeReview = testConstants.resumeReview1;

    mockResumeReview.state = state as 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';

    const result = shallow(<ResumeReviewCard resumeReview={mockResumeReview} />);

    if (state === 'seeking_reviewer') {
        expect(result.text()).toContain('Cancel review');
    } else {
        expect(result.text()).not.toContain('Cancel review');
    }
});

it.each(['cancelled', 'finished', 'reviewing', 'seeking_reviewer'])('displays the expand icon only when a review is finished', (state) => {
    const mockResumeReview = testConstants.resumeReview1;

    mockResumeReview.state = state as 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';

    const result = shallow(<ResumeReviewCard resumeReview={mockResumeReview} />);

    if (state === 'finished') {
        expect(result.find(ExpandMoreIcon)).toHaveLength(1);
    } else {
        expect(result.find(ExpandMoreIcon)).toHaveLength(0);
    }
});
