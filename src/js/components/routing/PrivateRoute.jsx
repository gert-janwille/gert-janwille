import React from 'react';
import {Route} from 'react-router-dom';

import token from '../../lib/token';
import localStorage from '../../lib/localStorage';


const PrivateRoute = ({component: Component, redirect: RedirectRoute, ...rest}) => {

  const checkToken = () => {
    if (!token.isValid() && !token.content()) {
      localStorage.clear('store');
      token.clear();
      return false;
    }
    return true;
  };

  return (
    <Route {...rest} render={props => (
      checkToken() ? (
        <Component {...props} />
      ) : (
        <RedirectRoute {...props} />
      )
    )} />
  );
};

export default PrivateRoute;
