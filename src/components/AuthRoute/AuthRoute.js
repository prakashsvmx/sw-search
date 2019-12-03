import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from "../../service/AuthService";


export const AuthRoute = ({ component: Component, logout,currentUser, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = AuthService.getUserInfo();
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} logout={logout} currentUser={currentUser}/>
    }} />
);

export default AuthRoute;