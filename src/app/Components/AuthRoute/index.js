import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthRoute = ({component: Component, isAuth, protectedRoute, ...rest}) => {
  const pathname = protectedRoute ? '/login' : '/';
  const redirectState = protectedRoute ? isAuth : !isAuth;
  return (
    <Route {...rest} render={
      props => {
        if (redirectState) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname,
              state: {
                from: props.location
              }
            }
          }/>
        }
      }
    }/>
  )
};

export default AuthRoute
