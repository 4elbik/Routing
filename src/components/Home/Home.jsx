import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button, Divider, Pagination, Tag, Card, Space, notification } from 'antd';
import styled from 'styled-components';
import * as actions from '../../actions';
import * as actionsArticles from '../../actions/articles';
import AuthWithTocken from '../../hoc/AuthWithTocken';
import { ARTICLE_LINK, LOGIN_LINK, ADD_ARTICLE_LINK } from '../../routes/endpoints';
import { ARTICLES_PER_PAGE } from '../../config';
import Preloader from '../Preloader';
import cn from 'classnames';

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

  handleLike = (slug, favorited) => (evt) => {
    evt.preventDefault();

    const {
      favoriteArticle,
      favoriteArticleFetching,
      unFavoriteArticle,
      unFavoriteArticleFetching,
    } = this.props;

    if (favorited && !favoriteArticleFetching.includes('requested') && !unFavoriteArticleFetching.includes('requested')) {
      return unFavoriteArticle(slug);
    }

    if (!favorited && !favoriteArticleFetching.includes('requested')) {
      return favoriteArticle(slug);
    }
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
    notification['error']({
      message
    });
  };

  renderArticles() {
    const { articlesObj, articlesFetching, favoriteArticleFetching } = this.props;

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

      const articleLikeIconClassNames = cn({
        'like-button-icon': true,
        active: article.favorited,
        requested: `requested ${article.slug}` === favoriteArticleFetching,
      })

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

              <div
                className="like-button-wrapper"
                onClick={this.handleLike(article.slug, article.favorited)}
              >
                <div className={articleLikeIconClassNames}>
                  <div className="heart" />
                </div>
                <div className="like-button-count">
                  
                  {article.favoritesCount}
                </div>
              </div>
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
      <div className="content">
        <h1>Home page</h1>
        <div>
          <Button type="primary">
            <Link to={ADD_ARTICLE_LINK}>Add new article</Link>
          </Button>
        </div>
        <UserWrapper>
          <span className="user-name">{user.username}</span>
          {isAuth ? <Button type="link" onClick={this.logout}>Log out</Button> : <Link to={LOGIN_LINK}>Log In</Link> }
        </UserWrapper>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, aliquid velit repellendus
          accusamus quasi consequuntur. Perspiciatis eos error natus rem laborum, reiciendis omnis,
          maxime sapiente ducimus tempora molestias aut officia.
        </p>
        <Divider />
        {this.renderArticles()}
        {this.renderPagination()}



        { errorMessage !== '' ? (
          <Space>
            { this.openNotificationWithIcon(errorMessage) }
          </Space>
        ) : null}
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

  & .like-button-wrapper {
    display: flex;
    align-items: center;

    margin-top: 10px;

    &:hover .like-button-icon {
      opacity: 1;
    }
  }

  & .like-button-icon {
    position: relative;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: no-repeat 50% / contain;
    opacity: 0.7;
    transition: opacity 100ms ease-in-out;
    background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Ctitle%3Elike_outline_24%3C%2Ftitle%3E%3Cpath%20d%3D%22M0%2C0H24V24H0Z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M17%2C2.9A6.43%2C6.43%2C0%2C0%2C1%2C23.4%2C9.33c0%2C3.57-1.43%2C5.36-7.45%2C10l-2.78%2C2.16a1.9%2C1.9%2C0%2C0%2C1-2.33%2C0L8.05%2C19.37C2%2C14.69.6%2C12.9.6%2C9.33A6.43%2C6.43%2C0%2C0%2C1%2C7%2C2.9a6.46%2C6.46%2C0%2C0%2C1%2C5%2C2.54A6.46%2C6.46%2C0%2C0%2C1%2C17%2C2.9ZM7%2C4.7A4.63%2C4.63%2C0%2C0%2C0%2C2.4%2C9.33c0%2C2.82%2C1.15%2C4.26%2C6.76%2C8.63l2.78%2C2.16a.1.1%2C0%2C0%2C0%2C.12%2C0L14.84%2C18c5.61-4.36%2C6.76-5.8%2C6.76-8.63A4.63%2C4.63%2C0%2C0%2C0%2C17%2C4.7c-1.56%2C0-3%2C.88-4.23%2C2.73L12%2C8.5l-.74-1.07C10%2C5.58%2C8.58%2C4.7%2C7%2C4.7Z%22%20fill%3D%22%23828a99%22%2F%3E%3C%2Fsvg%3E);

    &.active {
      opacity: 1;
      background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22m17%202.9a6.43%206.43%200%200%201%206.4%206.43c0%203.57-1.43%205.36-7.45%2010l-2.78%202.16a1.9%201.9%200%200%201%20-2.33%200l-2.79-2.12c-6.05-4.68-7.45-6.47-7.45-10.04a6.43%206.43%200%200%201%206.4-6.43%205.7%205.7%200%200%201%205%203.1%205.7%205.7%200%200%201%205-3.1z%22%20fill%3D%22%23ff3347%22%2F%3E%3C%2Fsvg%3E);
    }

    &.requested .heart {
      display: block;
    }

    & .heart {
      display: none;
      animation: heartbeat 0.5s infinite;
      animation-direction: alternate;
      background-color: red;
      height: 6px;
      position: relative;
      top: 2px;
      transform: rotate(-45deg);
      width: 6px;

      &:before,
      &:after {
        content: "";
        background-color: red;
        border-radius: 50%;
        height: 6px;
        position: absolute;
        width: 6px;
      }

      &:before {
        top: -3px;
        left: 0;
      }

      &:after {
        left: 3px;
        top: 0;
      }

      @keyframes heartbeat {
        0%
        {
          transform: scale( 1 )
            rotate(-45deg);    
        }
        100%
        {
          transform: scale( 2 )
            rotate(-45deg);
        }
      }
    }
  }

  & .like-button-count {
    margin-left: 6px;
  }
`;

Home.defaultProps = {
  user: {},
};

Home.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object),
  logout: PropTypes.func.isRequired,
  articlesObj: PropTypes.instanceOf(Object).isRequired,
  getArticles: PropTypes.func.isRequired,
};

const IfTockenExists = AuthWithTocken(Home);

export default connect(mapStateToProps, mapDispatchToProps)(IfTockenExists);
