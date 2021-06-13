import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Landing, { Intro } from './Landing';
import { shallowWithAuth0 } from '../util/testWithAuth0';

Enzyme.configure({ adapter: new Adapter() });
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
