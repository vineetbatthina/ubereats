import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import UserLoginLandingPage from './UserLoginLandingPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/userLogin' component={UserLoginLandingPage} />
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
