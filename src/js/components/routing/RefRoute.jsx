import React from 'react';
import {Route} from 'react-router-dom';
import {QueryStringToJSON} from '../../lib/util';

const RefRoute = ({component: Component, redirect: RedirectRoute, ...rest}) => {

  const checkRef = () => {
    const {ref} = QueryStringToJSON(rest.location.search);
    try {
      if (atob(ref)) return true;
    } catch (e) {
      return false;
    }     
    return false;
  };

  return (
    <Route {...rest} render={props => (
      checkRef() ? (
        <Component {...props} />
      ) : (
        <RedirectRoute {...props} />
      )
    )} />
  );
};

export default RefRoute;
