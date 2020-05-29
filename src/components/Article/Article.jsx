import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import * as actions from '../../actions/articles';
import getArticle from '../../utilities/getArticle';
import Preloader from '../Preloader/Preloader';

const mapStateToProps = (state) => {
  const props = {
    oneArticleFetching: state.oneArticleFetching,
  };

  return props;
};

class Article extends React.Component {
  state = {
    article: false,
  };

  componentDidMount() {
    this.getArticle();
  }

  getArticle = async () => {
    const response = await getArticle(this.props.match.params.slug);
    this.setState({ article: response.article });
  };

  render() {
    const { article } = this.state;

    if (!article) return <Preloader />;

    return (
      <div style={{ padding: '20px', backgroundColor: 'white' }}>
        <h2>{article.title}</h2>
        {article.description}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Article);
