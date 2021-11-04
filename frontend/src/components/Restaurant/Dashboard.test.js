import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RestaurantNavBar from './RestaurantNavBar';
import Dashboard from './Dashboard';
import { expect } from 'chai';

Enzyme.configure({
    adapter: new Adapter()
});

describe('<Dashboard />', () => {
  it('renders <RestaurantNavBar /> component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(RestaurantNavBar)); 
  });
});