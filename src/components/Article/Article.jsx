import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Button, Tag, notification } from 'antd';
import { EditOutlined, LeftCircleOutlined } from '@ant-design/icons';
import getArticle from '../../utilities/getArticle';
import Preloader from '../Preloader/Preloader';
import AuthWithTocken from '../../hoc/AuthWithTocken';
import * as actionsArticle from '../../actions/articles';
import AddEditArticle from '../AddEditArticle';
import { HOME_LINK } from '../../routes/endpoints';
import Page404 from '../Page404/Page404';

const mapStateToProps = (state) => {
  const props = {
    user: state.user,
    oneArticleFetching: state.oneArticleFetching,
    successMessage: state.successMessage,
    editArticleFetching: state.editArticleFetching,
    article: state.oneArticle,
  };

  return props;
};

const mapDispatchToProps = {
  deleteArticle: actionsArticle.deleteArticle,
  editArticleFetchingRestored: actionsArticle.editArticleFetchingRestored,
};

const openNotificationWithIcon = (message) => {
  notification.success({
    message,
  });
};

class Article extends React.Component {
  state = {
    article: false,
    articleFetching: 'requested',
    edit: false,
  };

  componentDidMount() {
    this.getArticle();
  }

  // componentWillUnmount() {
  //   console.log('componen анмаунтнулся')
  //   this.setState({ article: false });
  // }

  getArticle = async () => {
    const response = await getArticle(this.props.match.params.slug);
    if (!response) {
      return this.setState({ articleFetching: 'failed' });
    }
    this.setState({ article: response.article, articleFetching: 'finished' });
  };

  handleEdit = () => {
    this.setState({ edit: true });
  };

  handleEditSuccess = () => {
    const { match, history } = this.props;
    this.setState({ edit: false }, () => history.push(match.url));
  };

  handleCancelEdit = () => {
    const { match, history } = this.props;
    this.setState({ edit: false }, () => history.push(match.url));
  };

  handleDeleteArticle = (slug) => async (evt) => {
    evt.preventDefault();
    const { deleteArticle, history } = this.props;
    try {
      await deleteArticle(slug);
      openNotificationWithIcon('Article successful delete');
      history.push(HOME_LINK);
    } catch (err) {
      console.log(err, 'error on delete article');
    }
  }

  renderEditLink() {
    const { article } = this.state;
    const { user, match } = this.props;

    if (user.username === article.author.username) {
      return (
        <Link to={`${match.url}/edit`}>
          <Button onClick={this.handleEdit}>
            <EditOutlined />
            Edit
          </Button>
        </Link>
      );
    }

    return null;
  }

  componentDidUpdate() {
    const { edit } = this.state;
    const { editArticleFetching } = this.props;

    if (editArticleFetching === 'finished') {
      this.handleEditSuccess();
      // this.getArticle();
    }
  }
  
  render() {
    const { article, articleFetching, edit } = this.state;
    const { editArticleFetching, editArticleFetchingRestored } = this.props;

    if (articleFetching === 'failed') return <Page404 />;

    if (articleFetching === 'requested' || editArticleFetching === 'requested') {
      console.log('Тут происходит рендер прелоадера')
      return <Preloader />;
    }

    if (edit) {
      const initialValues = {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
      return (
        <AddEditArticle
          edit
          slug={article.slug}
          initialValues={initialValues}
          returnToArticle={this.handleCancelEdit}
          deleteArticle={this.handleDeleteArticle}
        />
      );
    }

    if (editArticleFetching === 'finished') {
      editArticleFetchingRestored();
    }

    return (
      <div className="content">
        <div className="return-back-arrow">
          <Link to={HOME_LINK}>
            <LeftCircleOutlined style={{ fontSize: '20px' }} />
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>{article.title}</h1>
          {this.renderEditLink()}
        </div>
        <Divider />

        <div>{article.description}</div>
        {article.body}
        <div style={{ marginTop: '50px' }}>{article.tagList.map((el) => <Tag key={el} color="#108ee9">{el}</Tag>)}</div>
      </div>
    );
  }
}

const IfTockenExists = AuthWithTocken(Article);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IfTockenExists));
