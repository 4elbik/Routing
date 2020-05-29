import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
// import Article from '../Article';
import * as routesLinks from '../../routes/endpoints';

const mapStateToProps = (state) => {
  const props = {
    user: state.user,
    isAuth: state.isAuth,
  };

  return props;
};

const App = (props) => {
  const { user, isAuth } = props;

  if (isAuth) {
    // Из-за приватных роутов конкретно в Login компоненте
    // не закинуть токен в локалстор. Поэтому это дело происходит здесь.
    // Это нормально?
    localStorage.setItem('token', user.token);
  }

  return (
    <MainWrapper>
      <Router>
        <Switch>
          <PrivateRoute
            isAuth={isAuth}
            path={routesLinks.HOME_LINK}
            redirectTo={routesLinks.LOGIN_LINK}
            exact
          >
            <Home />
          </PrivateRoute>
          <PrivateRoute
            isAuth={!isAuth}
            path={routesLinks.LOGIN_LINK}
            redirectTo={routesLinks.HOME_LINK}
            exact
          >
            <Login />
          </PrivateRoute>
          <PrivateRoute
            isAuth={!isAuth}
            path={routesLinks.REGISTER_LINK}
            redirectTo={routesLinks.HOME_LINK}
            exact
          >
            <Signup />
          </PrivateRoute>
          {/* <Route path={`${routesLinks.ARTICLE_LINK}/:slug`} component={Article} /> */}
        </Switch>
      </Router>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  min-height: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    25deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 20%,
    rgba(0, 212, 255, 1) 100%
  );

  & .content {
    width: 40%;

    padding: 20px;

    background-color: #fff;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.5);
    border: 2px solid lightblue;
    border-radius: 5px;

    & h1 {
      margin: 0;
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 400;
    }

    & p {
      margin: 0;
    }
  }
`;

App.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
