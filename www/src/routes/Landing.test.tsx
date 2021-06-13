import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Landing from './Landing';
import { shallowWithAuth0 } from '../util/testWithAuth0';

Enzyme.configure({ adapter: new Adapter() });
describe('Landing', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Landing />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders with button when not authenticated', () => {
        const wrapper = shallowWithAuth0(<Landing />, {
            isAuthenticated: false,
        });
        expect(wrapper).toMatchSnapshot();
    });
});
