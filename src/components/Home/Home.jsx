import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import * as actions from '../../actions';

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
  state = {
    redirect: false,
  };

  componentDidMount() {
    const { user } = this.props;
    if (!user.token) {
      this.setRedirect();
    }
  }

  componentDidUpdate() {
    const { user } = this.props;
    if (!user.token) {
      this.setRedirect();
    }
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return null;
  };

  logout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { user } = this.props;

    return (
      <div className="content">
        <h1>Home page</h1>
        {this.renderRedirect()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
