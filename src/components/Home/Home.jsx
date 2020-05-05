import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import styled from 'styled-components';

const mapStateToProps = (state) => {
  const props = {
    userName: state.user
  };

  return props;
}

const Home = (props) => {
  // const { userName } = props;
  const userName = 'Maksim4ik1st';

  return (
    <div className="content">
      <h1>Home page</h1>
      <UserWrapper>
        <span className="user-name">{ userName }</span>
        <Button type="link"><a href="/logout">Log out</a></Button>
      </UserWrapper>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, aliquid velit repellendus accusamus quasi consequuntur. Perspiciatis eos error natus rem laborum, reiciendis omnis, maxime sapiente ducimus tempora molestias aut officia.</p>
    </div>
  );
};

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export default connect(mapStateToProps)(Home);
