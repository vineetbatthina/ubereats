import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RestaurantPrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('res') ?
                <Component {...props} />
            : localStorage.getItem('cust') ? <Redirect to="/custdashboard" /> : <Redirect to="/" />
        )} />
    );
};

export default RestaurantPrivateRoute;