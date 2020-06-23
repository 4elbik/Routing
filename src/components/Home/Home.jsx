import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button, Divider, Pagination, Tag, Card, Space, notification } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import * as actions from '../../actions';
import * as actionsArticles from '../../actions/articles';
import AuthWithTocken from '../../hoc/AuthWithTocken';
import { ARTICLE_LINK, LOGIN_LINK, ADD_ARTICLE_LINK } from '../../routes/endpoints';
import { ARTICLES_PER_PAGE } from '../../config';
import Preloader from '../Preloader';
import Likes from '../Likes/Likes';

const mapStateToProps = (state) => {
  const props = {
    isAuth: state.isAuth,
    user: state.user,
    articlesObj: state.articles,
    favoriteArticleFetching: state.favoriteArticleFetching,
    unFavoriteArticleFetching: state.unFavoriteArticleFetching,
    articlesFetching: state.articlesFetching,
    activeTagName: state.activeTagName,
    errorMessage: state.errorMessage,
  };

  return props;
};

const mapDispatchToProps = {
  logout: actions.logoutUser,
  getArticles: actionsArticles.getArticles,
  favoriteArticle: actionsArticles.favoriteArticle,
  unFavoriteArticle: actionsArticles.unFavoriteArticle,
  changeActiveTagName: actionsArticles.activeTagName,
};

class Home extends React.Component {
  componentDidMount() {
    const { getArticles } = this.props;
    getArticles();
  }

  logout = () => {
    const { logout } = this.props;
    localStorage.removeItem('token');
    logout();
  };

  handleTagClick = (tagName) => (evt) => {
    evt.preventDefault();
    const { getArticles, changeActiveTagName } = this.props;
    changeActiveTagName(tagName);
    getArticles({ tagName });
  };

  handleChangePageNumber = (pageNumber) => {
    const { getArticles, activeTagName } = this.props;
    getArticles({ tagName: activeTagName, pageNumber });
  };

  openNotificationWithIcon = (message) => {
    notification.error({
      message,
    });
  };

  renderArticles() {
    const { articlesObj, articlesFetching } = this.props;

    if (articlesFetching === 'requested') {
      return (
        <div style={{ height: '200px', background: 'lightblue' }}>
          <Preloader />
        </div>
      );
    }

    if (articlesObj.articlesCount === 0) return null;

    const articles = articlesObj.articles.map((article) => {
      const articleTags = article.tagList.map((tagName) => {
        return (
          <div key={tagName} className="article-tag-item" onClick={this.handleTagClick(tagName)}>
            <Tag color="#108ee9">{tagName}</Tag>
          </div>
        );
      });

      return (
        <ArticleWrapper key={article.slug}>
          <Link to={`${ARTICLE_LINK}/${article.slug}`}>
            <Card
              type="inner"
              title={article.title}
              extra={
                <time>
                  {' '}
                  {formatDistanceToNow(new Date(article.createdAt), {
                    includeSeconds: true,
                    addSuffix: true,
                  })}{' '}
                </time>
              }
            >
              <div className="article-author">
                <span>Author: {article.author.username}</span>
              </div>

              {articleTags.length !== 0 ? (
                <div className="article-tags tags-wrapper">
                  <Divider orientation="left">Tags</Divider>
                  <div className="tags-list">{articleTags}</div>
                </div>
              ) : null}

              <Likes article={article} style={{ marginTop: '10px' }} />
            </Card>
          </Link>
        </ArticleWrapper>
      );
    });

    return <div className="articles">{articles}</div>;
  }

  renderPagination() {
    const { articlesObj } = this.props;

    if (articlesObj.articlesCount <= ARTICLES_PER_PAGE) {
      return null;
    }

    return (
      <>
        <Divider />
        <div className="pagination" style={{ textAlign: 'center' }}>
          <Pagination
            onChange={this.handleChangePageNumber}
            defaultCurrent={1}
            defaultPageSize={ARTICLES_PER_PAGE}
            total={articlesObj.articlesCount}
            hideOnSinglePage
            showSizeChanger={false}
          />
        </div>
        <Divider />
      </>
    );
  }

  render() {
    const { isAuth, user, errorMessage } = this.props;

    return (
      <HomeWrapper>
        <div className="content">
          {isAuth ? (
            <div className="add-new-article">
              <Link to={ADD_ARTICLE_LINK} title="Add new article">
                <FileAddOutlined />
              </Link>
            </div>
          ) : null}
          <h1>Home page</h1>
          <UserWrapper>
            <span className="user-name">{user.username}</span>
            {isAuth ? (
              <Button type="link" onClick={this.logout}>
                Log out
              </Button>
            ) : (
              <Link to={LOGIN_LINK}>Log In</Link>
            )}
          </UserWrapper>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, aliquid velit
            repellendus accusamus quasi consequuntur. Perspiciatis eos error natus rem laborum,
            reiciendis omnis, maxime sapiente ducimus tempora molestias aut officia.
          </p>
          <Divider />
          {this.renderArticles()}
          {this.renderPagination()}

          {errorMessage !== '' ? (
            <Space>{this.openNotificationWithIcon(errorMessage)}</Space>
          ) : null}
        </div>
      </HomeWrapper>
    );
  }
}

const HomeWrapper = styled.div`
  width: 100%;

  & .content {
    position: relative;
    margin: 0 auto;
  }

  & .add-new-article {
    position: absolute;
    top: 25px;
    left: -58px;

    padding: 7px 8px 13px 8px;

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
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ArticleWrapper = styled.div`
  margin-bottom: 20px;
  background-color: tomato;

  &:last-child {
    margin-bottom: 0;
  }

  & a {
    color: inherit;
  }

  & .tags-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

Home.defaultProps = {
  user: {},
  errorMessage: '',
  activeTagName: '',
};

Home.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object),
  logout: PropTypes.func.isRequired,
  articlesObj: PropTypes.instanceOf(Object).isRequired,
  getArticles: PropTypes.func.isRequired,
  articlesFetching: PropTypes.string.isRequired,
  activeTagName: PropTypes.string,
  changeActiveTagName: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

const IfTockenExists = AuthWithTocken(Home);

export default connect(mapStateToProps, mapDispatchToProps)(IfTockenExists);
