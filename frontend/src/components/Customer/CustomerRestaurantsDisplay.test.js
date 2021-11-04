import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerRestaurantsDisplay from './CustomerRestaurantsDisplay';
import RestaurantCard from '../Common/RestaurantCard';
import { expect } from 'chai';

Enzyme.configure({
    adapter: new Adapter()
});

describe('<CustomerRestaurantsDisplay />', () => {
  it('renders <RestaurantCard /> component', () => {
    const wrapper = shallow(<CustomerRestaurantsDisplay />);
    expect(wrapper.find(RestaurantCard)); 
  });
});