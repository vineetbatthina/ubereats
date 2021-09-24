import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        // restricted = false meaning public route
        <Route {...rest} render={props => (
            localStorage.getItem('res') ?
                <Redirect to="/dashboard" />
            : localStorage.getItem('cust') ? <Redirect to="/custdashboard" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;