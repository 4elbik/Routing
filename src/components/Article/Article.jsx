import React from 'react';
import { connect } from 'react-redux';
import AuthWithTocken from '../../hoc/AuthWithTocken';
import * as actionsArticle from '../../actions/articles';
import Preloader from '../Preloader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { HOME_LINK, ARTICLE_LINK } from '../../routes/endpoints';
import Page404 from '../Page404/Page404';
import { UserOutlined, CommentOutlined, FormOutlined } from '@ant-design/icons';
import { Divider, Tag, Space, notification } from 'antd';
import Likes from '../Likes/Likes';

const mapStateToProps = (state) => {
  const props = {
    username: state.user.username,
    currentArticle: state.currentArticle,
    errorMessage: state.errorMessage,
  };

  return props;
}

const mapDispatchToProps = {
  getArticle: actionsArticle.getOneArticle,
};

class Article extends React.Component {
  componentDidMount() {
    const { getArticle, match: { params : { slug } } } = this.props;
    getArticle(slug);
  }

  openNotificationWithIcon = (message) => {
    notification.error({
      message,
    });
  };

  render() {
    const { username, currentArticle: { fetching, article }, errorMessage } = this.props;

    if (fetching === 'failed') return <Page404 />;

    if (fetching !== 'finished') return <Preloader />;

    return (
      <ArticleWrapper>
        <div className="content">
          <div className="back-arrow"><Link to={HOME_LINK}>&larr;</Link></div>
          { article.author && article.author.username === username ? (
            <div className="edit-link">
              <Link to={`${ARTICLE_LINK}/${article.slug}/edit`}><FormOutlined /></Link>
            </div>
          ) : null }
          <h1>{article.title}</h1>
          <div className="info">
            <div><time>{format(new Date(article.createdAt), 'yyyy-MM-dd HH:mm')}</time><span><UserOutlined className="icon-author" />{article.author.username}</span></div>
          </div>
          <div className="likes-comments">
            <Likes article={article} />
            <div className="comments"><CommentOutlined style={{ color: '#a8adb8' }} /></div>
          </div>
          <Divider />
          <div className="description">
            {article.description}
          </div>
          <Divider />
          <div className="body">
            {article.body}
          </div>
          { article.tagList.length > 0 ? (
            <div className="tags">
              { article.tagList.map((el) => <Tag key={el} color="#108ee9">{el}</Tag>) }
            </div>
          ) : null}
        </div>
        
        {errorMessage !== '' ? <Space>{this.openNotificationWithIcon(errorMessage)}</Space> : null}
      </ArticleWrapper>
    );
  }
}

const ArticleWrapper = styled.div`
  width: 100%;

  & .content {
    position: relative;
    margin: 0 auto;
  }

  & .back-arrow,
  & .edit-link {
    position: absolute;
    top: 25px;
    left: -52px;

    padding: 7px 6px 13px 10px;

    & a {
      color: #fff;
      opacity: 0.7;
    }
    font-size: 40px;
    line-height: 1;

    background-color: #1890ff;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: inset 0px 0px 2px black;

    &:hover {
      background-color: #186aff;
      box-shadow: inset 0px 0px 5px black;
      cursor: pointer;

      & a {
        opacity: 0.9;
      }
    }
  }

  & .edit-link {
    top: 100px;

    padding: 11px 7px 13px 8px;

    font-size: 35px;

    background-color: #47b747;

    &:hover {
      background-color: #3d9c3d;
    }
  }

  & .info {
    margin-bottom: 10px;

    & div {
      display: flex;
      justify-content: space-between;

      & .icon-author {
        margin-right: 3px;
      }
    }
  }

  & .likes-comments {
    display: flex;

    & > div {
      margin-right: 30px;

      // While i have not <Comments /> component
      &.comments {
        font-size: 24px;
      }
    }
  }
  
  & .body {
    white-space: pre-line;
  }

  & .tags {
    margin-top: 20px;
  }
`;

const IfTockenExists = AuthWithTocken(Article);

export default connect(mapStateToProps, mapDispatchToProps)(IfTockenExists);