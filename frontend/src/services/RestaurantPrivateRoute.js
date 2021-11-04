import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RestaurantPrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            (localStorage.getItem('isLoggedIn') && localStorage.getItem('isRestaurantOwner')==='Y') ?
                <Component {...props} />
            : (localStorage.getItem('isLoggedIn') && localStorage.getItem('isRestaurantOwner')==='N') ? <Redirect to="/custdashboard" /> : <Redirect to="/" />
        )} />
    );
};

export default RestaurantPrivateRoute;