import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import * as actionsArticles from '../../actions/articles';

const mapStateToProps = (state) => {
  const props = {
    favoriteArticleFetching: state.favoriteArticleFetching,
    unFavoriteArticleFetching: state.unFavoriteArticleFetching,
  };

  return props;
};

const mapDispatchToProps = {
  favoriteArticle: actionsArticles.favoriteArticle,
  unFavoriteArticle: actionsArticles.unFavoriteArticle,
};

class Likes extends React.Component {
  handleLike = (slug, favorited) => (evt) => {
    evt.preventDefault();

    const {
      favoriteArticle,
      favoriteArticleFetching,
      unFavoriteArticle,
      unFavoriteArticleFetching,
    } = this.props;

    if (
      favorited &&
      !favoriteArticleFetching.includes('requested') &&
      !unFavoriteArticleFetching.includes('requested')
    ) {
      return unFavoriteArticle(slug);
    }

    if (!favorited && !favoriteArticleFetching.includes('requested')) {
      return favoriteArticle(slug);
    }
  };

  render() {
    const { article, favoriteArticleFetching, style = {} } = this.props;

    const articleLikeIconClassNames = cn({
      'like-button-icon': true,
      active: article.favorited,
      requested: `requested ${article.slug}` === favoriteArticleFetching,
    });

    return (
      <LikeButtonWrapper
        className="like-button-wrapper"
        onClick={this.handleLike(article.slug, article.favorited)}
        style={style}
      >
        <div className={articleLikeIconClassNames}>
          <div className="heart" />
        </div>
        <div className="like-button-count">{article.favoritesCount}</div>
      </LikeButtonWrapper>
    );
  }
}

const LikeButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  
    & .like-button-icon {
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
        content: '';
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
        0% {
          transform: scale(1) rotate(-45deg);
        }
        100% {
          transform: scale(2) rotate(-45deg);
        }
      }
    }
  }

  & .like-button-count {
    margin-left: 6px;
  }
`;

Likes.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Likes);