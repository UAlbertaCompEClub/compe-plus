import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Landing from './Landing';

Enzyme.configure({ adapter: new Adapter() });
describe('Landing', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Landing />);
        expect(wrapper.find('#getting-stated-button').length).toBe(0);
    });
});
