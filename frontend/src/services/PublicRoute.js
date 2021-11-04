import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        // restricted = false meaning public route
        <Route {...rest} render={props => (
            (localStorage.getItem('isLoggedIn') && localStorage.getItem('isRestaurantOwner')==='Y') ?
                <Redirect to="/dashboard" />
            : (localStorage.getItem('isLoggedIn') && localStorage.getItem('isRestaurantOwner')==='N') ? <Redirect to="/custdashboard" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;