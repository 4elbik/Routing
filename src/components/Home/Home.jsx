import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button, Divider } from 'antd';
import styled from 'styled-components';
import * as actions from '../../actions';
// import * as actionsArticles from '../../actions/articles';
import AuthWithTocken from '../../hoc/AuthWithTocken';
// import { ARTICLE_LINK } from '../../routes/endpoints';

const mapStateToProps = (state) => {
  const props = {
    user: state.user,
    // articlesObj: state.articles,
    // favoriteArticleFetching: state.favoriteArticleFetching,
    // unFavoriteArticleFetching: state.unFavoriteArticleFetching,
  };

  return props;
};

const mapDispatchToProps = {
  logout: actions.logoutUser,
  // getArticles: actionsArticles.getArticles,
  // favoriteArticle: actionsArticles.favoriteArticle,
  // unFavoriteArticle: actionsArticles.unFavoriteArticle,
  // changeActiveTagName: actionsArticles.activeTagName,
};

class Home extends React.Component {
  // componentDidMount() {
  //   const { getArticles } = this.props;
  //   getArticles();
  // }

  logout = () => {
    const { logout } = this.props;
    localStorage.removeItem('token');
    logout();
  };

  // handleLike = (slug, favorited) => (evt) => {
  //   evt.preventDefault();

  //   const {
  //     favoriteArticle,
  //     favoriteArticleFetching,
  //     unFavoriteArticle,
  //     unFavoriteArticleFetching,
  //   } = this.props;

  //   if (
  //     favorited &&
  //     favoriteArticleFetching !== 'requested' &&
  //     unFavoriteArticleFetching !== 'requested'
  //   ) {
  //     return unFavoriteArticle(slug);
  //   }

  //   if (favoriteArticleFetching !== 'requested' && unFavoriteArticleFetching !== 'requested') {
  //     return favoriteArticle(slug);
  //   }
  // };

  // handleTagClick = (tagName) => (evt) => {
  //   evt.preventDefault();
  //   const { getArticles, changeActiveTagName } = this.props;
  //   changeActiveTagName(tagName);
  //   getArticles(tagName);
  // }

  // renderArticles() {
  //   const { articlesObj } = this.props;

  //   if (articlesObj.articlesCount === 0) return null;

  //   return articlesObj.articles.map((article) => {
  //     const articleTags = article.tagList.map((tagName) => {
  //       return (
  //         <div className="article-tag-item" onClick={this.handleTagClick(tagName)}>
  //           #{tagName}
  //         </div>
  //       );
  //     });

  //     return (
  //       <ArticleWrapper key={article.slug}>
  //         <Link to={`${ARTICLE_LINK}/${article.slug}`}>
  //           <div className="header">{article.title}</div>
  //           <div className="article-info">
  //             <div>
  //               Created
  //               <time>
  //                 {' '}
  //                 {formatDistanceToNow(new Date(article.createdAt), {
  //                   includeSeconds: true,
  //                   addSuffix: true,
  //                 })}{' '}
  //               </time>
  //             </div>
  //             <span>{article.author.username}</span>
  //           </div>

  //           { articleTags.length !== 0 ? (
  //               <div className="article-tags" style={{ background: 'tomato' }}>
  //                 Tags:
  //                 { articleTags }
  //               </div>
  //             ) : null }

  //           <div
  //             className="like-button-wrapper"
  //             onClick={this.handleLike(article.slug, article.favorited)}
  //           >
  //             <div className={article.favorited ? 'like-button-icon active' : 'like-button-icon'} />
  //             <div className="like-button-count">{article.favoritesCount}</div>
  //           </div>
  //         </Link>
  //       </ArticleWrapper>
  //     );
  //   });
  // }

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
        <Divider />
        {/* <div className="articles">{this.renderArticles()}</div> */}
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

// const ArticleWrapper = styled.div`
//   margin-bottom: 20px;
//   background-color: #fff;

//   &:last-child {
//     margin-bottom: 0;
//   }

//   & a {
//     color: inherit;
//   }

//   & .like-button-wrapper {
//     display: flex;
//     align-items: center;

//     &:hover .like-button-icon {
//       opacity: 1;
//     }
//   }

//   & .like-button-icon {
//     flex: 0 0 auto;
//     width: 24px;
//     height: 24px;
//     background: no-repeat 50% / contain;
//     opacity: 0.7;
//     transition: opacity 100ms ease-in-out;
//     background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Ctitle%3Elike_outline_24%3C%2Ftitle%3E%3Cpath%20d%3D%22M0%2C0H24V24H0Z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M17%2C2.9A6.43%2C6.43%2C0%2C0%2C1%2C23.4%2C9.33c0%2C3.57-1.43%2C5.36-7.45%2C10l-2.78%2C2.16a1.9%2C1.9%2C0%2C0%2C1-2.33%2C0L8.05%2C19.37C2%2C14.69.6%2C12.9.6%2C9.33A6.43%2C6.43%2C0%2C0%2C1%2C7%2C2.9a6.46%2C6.46%2C0%2C0%2C1%2C5%2C2.54A6.46%2C6.46%2C0%2C0%2C1%2C17%2C2.9ZM7%2C4.7A4.63%2C4.63%2C0%2C0%2C0%2C2.4%2C9.33c0%2C2.82%2C1.15%2C4.26%2C6.76%2C8.63l2.78%2C2.16a.1.1%2C0%2C0%2C0%2C.12%2C0L14.84%2C18c5.61-4.36%2C6.76-5.8%2C6.76-8.63A4.63%2C4.63%2C0%2C0%2C0%2C17%2C4.7c-1.56%2C0-3%2C.88-4.23%2C2.73L12%2C8.5l-.74-1.07C10%2C5.58%2C8.58%2C4.7%2C7%2C4.7Z%22%20fill%3D%22%23828a99%22%2F%3E%3C%2Fsvg%3E);

//     &.active {
//       opacity: 1;
//       background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22m17%202.9a6.43%206.43%200%200%201%206.4%206.43c0%203.57-1.43%205.36-7.45%2010l-2.78%202.16a1.9%201.9%200%200%201%20-2.33%200l-2.79-2.12c-6.05-4.68-7.45-6.47-7.45-10.04a6.43%206.43%200%200%201%206.4-6.43%205.7%205.7%200%200%201%205%203.1%205.7%205.7%200%200%201%205-3.1z%22%20fill%3D%22%23ff3347%22%2F%3E%3C%2Fsvg%3E);
//     }
//   }

//   & .like-button-count {
//     margin-left: 6px;
//   }
// `;

Home.defaultProps = {
  user: {},
};

Home.propTypes = {
  user: PropTypes.instanceOf(Object),
  logout: PropTypes.func.isRequired,
  // articlesObj: PropTypes.instanceOf(Object).isRequired,
  // getArticles: PropTypes.func.isRequired,
};

const IfTockenExists = AuthWithTocken(Home);

export default connect(mapStateToProps, mapDispatchToProps)(IfTockenExists);
