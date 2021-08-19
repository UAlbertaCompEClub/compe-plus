import { shallow } from 'enzyme';
import React from 'react';

import { shallowWithAuth0 } from '../../util/testWithAuth0';
import Landing, { Intro } from './Landing';

describe('Landing', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Landing />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Intro', () => {
    it.each`
        isAuthenticated | friendlyName
        ${true}         | ${'when authenticated'}
        ${false}        | ${'when unauthenticated'}
    `('renders correctly', ({ isAuthenticated, friendlyName }) => {
        const wrapper = shallowWithAuth0(<Intro />, {
            isAuthenticated,
        });
        expect(wrapper).toMatchSnapshot(friendlyName);
    });
});
