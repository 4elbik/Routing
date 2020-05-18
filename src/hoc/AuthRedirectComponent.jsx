import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LOGIN_LINK } from '../routes/endpoints';

const AuthRedirectComponent = (NewComponent) => {
  const mapStateToProps = (state) => {
    const props = {
      isAuth: state.isAuth,
    };

    return props;
  };

  const RedirectComponent = (props) => {
    const { isAuth } = props;
    const token = localStorage.getItem('token');

    if (!isAuth && !token) {
      return <Redirect to={LOGIN_LINK} />;
    }

    return <NewComponent {...props} />;
  };

  RedirectComponent.propTypes = {
    isAuth: PropTypes.bool.isRequired,
  };

  return connect(mapStateToProps)(RedirectComponent);
};

export default AuthRedirectComponent;
