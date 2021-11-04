import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerNavBar from './CustomerNavBar';
import CustomerDashboard from './CustomerDashboard';
import { expect } from 'chai';

Enzyme.configure({
    adapter: new Adapter()
});

describe('<Dashboard />', () => {
  it('renders <RestaurantNavBar /> component', () => {
    const wrapper = shallow(<CustomerDashboard />);
    expect(wrapper.find(CustomerNavBar)); 
  });
});