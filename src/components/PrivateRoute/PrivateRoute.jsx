import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, isAuth, redirectTo, ...rest }) => (
  <Route 
    {...rest} 
    render={() => (
      isAuth ? (
        children
      ) : (
        <Redirect to={redirectTo} />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  isAuth: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
