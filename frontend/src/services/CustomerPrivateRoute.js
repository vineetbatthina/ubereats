import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const CustomerPrivateRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            (localStorage.getItem('isLoggedIn') && localStorage.getItem('isRestaurantOwner')==='N')?
                <Component {...props} />
            : localStorage.getItem('res') ? <Redirect to="/dashboard" /> : <Redirect to="/" />
        )} />
    );
};

export default CustomerPrivateRoute;