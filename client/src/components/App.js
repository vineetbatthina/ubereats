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

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute path='/userLogin' component={UserLoginLandingPage} />
          <PublicRoute exact path='/restaurant' component={RestaurantLoginLandingPage} />
          <PublicRoute exact path='/' component={LandingPage} />
          <RestaurantPrivateRoute exact path='/dashboard' component={Dashboard} />
          <CustomerPrivateRoute exact path='/custdashboard' component={CustomerDashboard} />
          <CustomerPrivateRoute exact path='/restaurantDisplay' component={RestaurantDisplay} />
        </Switch>
      </Router>
    );
  }
}

export default App;
