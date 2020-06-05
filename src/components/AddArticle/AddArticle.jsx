import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AuthWithTocken from '../../hoc/AuthWithTocken';

const AddArticle = (props) => {
  return (
    <AddArticleWrapper>
      <h1>Add new article</h1>
    </AddArticleWrapper>
  );
};

const AddArticleWrapper = styled.div`
  background-color: #fff;
`;

const IfTockenExists = AuthWithTocken(AddArticle);

export default connect(null)(IfTockenExists);