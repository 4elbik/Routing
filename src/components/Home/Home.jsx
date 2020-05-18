import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import * as actions from '../../actions';
import AuthRedirectComponent from '../../hoc/AuthRedirectComponent';
import AuthWithTocken from '../../hoc/AuthWithTocken';

const mapStateToProps = (state) => {
  const props = {
    user: state.user,
  };

  return props;
};

const mapDispatchToProps = {
  logout: actions.logoutUser,
};

class Home extends React.Component {
  logout = () => {
    const { logout } = this.props;
    // Какие-то сомнения в использовании нативного JS. Правильно ли что это дело тут происходит?
    // Суть в том, что при разлогировании нужно и из local storage убирать токен. И мне кажется эта логика
    // должна быть в файле actions, но я как-то не смог допереть как это там можно сделать
    localStorage.removeItem('token');
    logout();
  };

  render() {
    const { user } = this.props;

    return (
      <div className="content">
        <h1>Home page</h1>
        <UserWrapper>
          <span className="user-name">{user.username}</span>
          <Button type="link" onClick={this.logout}>
            Log out
          </Button>
        </UserWrapper>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, aliquid velit repellendus
          accusamus quasi consequuntur. Perspiciatis eos error natus rem laborum, reiciendis omnis,
          maxime sapiente ducimus tempora molestias aut officia.
        </p>
      </div>
    );
  }
}

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

Home.defaultProps = {
  user: {},
};

Home.propTypes = {
  user: PropTypes.instanceOf(Object),
  logout: PropTypes.func.isRequired,
};

const IfTockenExists = AuthWithTocken(Home);
const WithRedirectComponent = AuthRedirectComponent(IfTockenExists);

export default connect(mapStateToProps, mapDispatchToProps)(WithRedirectComponent);
