import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';

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
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  height: 100vh;
  background: rgb(2,0,36);
  background: linear-gradient(25deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 20%, rgba(0,212,255,1) 100%);

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

export default connect(mapStateToProps)(App);
