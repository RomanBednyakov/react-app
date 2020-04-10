import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (!isAuth) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
};

export default AuthRoute
