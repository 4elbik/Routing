import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, condition, redirectTo, ...rest }) => (
  <Route {...rest} render={() => (condition ? children : <Redirect to={redirectTo} />)} />
);

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  condition: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
