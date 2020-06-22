import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Article from '../Article';
import AddEditArticle from '../AddEditArticle';
import * as routesLinks from '../../routes/endpoints';
import Page404 from '../Page404/Page404';

const mapStateToProps = (state) => {
  const props = {
    isAuth: state.isAuth,
  };

  return props;
};

const App = (props) => {
  const { isAuth } = props;

  return (
    <MainWrapper>
      <Router>
        <Switch>
          <Route path={routesLinks.HOME_LINK} exact component={Home} />
          <PrivateRoute
            condition={!isAuth}
            path={routesLinks.LOGIN_LINK}
            redirectTo={routesLinks.HOME_LINK}
            exact
          >
            <Login />
          </PrivateRoute>
          <PrivateRoute
            condition={!isAuth}
            path={routesLinks.REGISTER_LINK}
            redirectTo={routesLinks.HOME_LINK}
            exact
          >
            <Signup />
          </PrivateRoute>
          <Route path={`${routesLinks.ARTICLE_LINK}/:slug`} exact component={Article} />
          <Route path={`${routesLinks.ARTICLE_LINK}/:slug/edit`} component={AddEditArticle} />
          <PrivateRoute
            condition={isAuth}
            path={routesLinks.ADD_ARTICLE_LINK}
            redirectTo={routesLinks.LOGIN_LINK}
          >
            <AddEditArticle />
          </PrivateRoute>
          <Route>
            <Page404 />
          </Route>
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
      // margin-bottom: 20px;
      font-size: 24px;
      font-weight: 400;
    }

    & p {
      margin: 0;
    }
  }
`;

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
