import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Preloader from '../components/Preloader/Preloader';

const AuthWithTocken = (Component) => {
  const mapStateToProps = (state) => {
    const props = {
      isAuth: state.isAuth,
      userLoginFetching: state.userLoginFetching,
    };

    return props;
  };

  const mapDispatchToProps = {
    loginUserToken: actions.loginUserToken,
  };

  class AuthWithTockenComponent extends React.Component {
    handleLoginAction = () => {
      const { loginUserToken } = this.props;
      loginUserToken();
    };

    render() {
      const { isAuth, userLoginFetching } = this.props;
      const token = localStorage.getItem('token');

      if (!isAuth && token && userLoginFetching !== 'requested') {
        this.handleLoginAction();
      }
      if (!isAuth && token && userLoginFetching !== 'finished') {
        return <Preloader />;
      }

      return <Component {...this.props} />;
    }
  }

  AuthWithTockenComponent.propTypes = {
    userLoginFetching: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    loginUserToken: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthWithTockenComponent);
};

export default AuthWithTocken;
