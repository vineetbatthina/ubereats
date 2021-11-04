import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './Restaurant/Dashboard';
import CustomerDashboard from './Customer/CustomerDashboard';
import RestaurantLoginLandingPage from './Restaurant/RestaurantLoginLandingPage';
import UserLoginLandingPage from './UserLoginLandingPage';
import RestaurantPrivateRoute from '../services/RestaurantPrivateRoute';
import CustomerPrivateRoute from '../services/CustomerPrivateRoute';
import PublicRoute from '../services/PublicRoute';
import RestaurantDisplay from './Common/RestaurantDisplay';
import Checkout from './Customer/Checkout';
import CustomerProfile from './Customer/CustomerProfile';
import CustomerOrders from './Customer/Orders';
import RestaurantProfile from './Restaurant/RestaurantProfile';
import RestaurantMenu from './Restaurant/RestaurantMenu';
import RestaurantOrders from './Restaurant/Orders';
import CustomerFavourites from './Customer/CustomerFavourites';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute path='/userLogin' component={UserLoginLandingPage} />
          <PublicRoute exact path='/restaurant' component={RestaurantLoginLandingPage} />
          <PublicRoute exact path='/' component={LandingPage} />
          <PublicRoute exact path='/restaurantDisplayForGuest' component={RestaurantDisplay} />
          <RestaurantPrivateRoute exact path='/dashboard' component={Dashboard} />
          <RestaurantPrivateRoute exact path='/restaurantProfile' component={RestaurantProfile} />
          <RestaurantPrivateRoute exact path='/restaurantMenu' component={RestaurantMenu} />
          <RestaurantPrivateRoute exact path='/restaurantOrders' component={RestaurantOrders} />
          <CustomerPrivateRoute exact path='/custdashboard' component={CustomerDashboard} />
          <CustomerPrivateRoute exact path='/favourites' component={CustomerFavourites} />
          <CustomerPrivateRoute exact path='/restaurantDisplayForCustomer' component={RestaurantDisplay} />
          <CustomerPrivateRoute exact path='/checkout' component={Checkout} />
          <CustomerPrivateRoute exact path='/customerProfile' component={CustomerProfile} />
          <CustomerPrivateRoute exact path='/customerOrders' component={CustomerOrders} />
        </Switch>
      </Router>
    );
  }
}

export default App;
