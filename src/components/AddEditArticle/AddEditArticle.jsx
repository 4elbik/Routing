import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { withRouter, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider, Input, Button, notification } from 'antd';
import styled from 'styled-components';
import classNames from 'classnames';
import AuthWithTocken from '../../hoc/AuthWithTocken';
import EditableTagGroup from '../AddTags';
import * as actionsArticles from '../../actions/articles';
import { formatAddArticleErrorsToFormikErrors } from '../../utilities/formatServerErrors';
import { HOME_LINK } from '../../routes/endpoints';
import Preloader from '../Preloader';

const mapStateToProps = (state) => {
  const props = {
    userLoginFetching: state.userLoginFetching,
    currentArticle: state.currentArticle,
    username: state.user.username,
  };

  return props;
};

const mapDispatchToProps = {
  addArticle: actionsArticles.addArticle,
  getArticle: actionsArticles.getOneArticle,
  updateArticle: actionsArticles.updateArticle,
  deleteArticle: actionsArticles.deleteArticle,
};

const fieldErrorClassNames = (field, errors, touched) => {
  return classNames({ error: errors[field] && touched[field] });
};

const openNotificationWithIcon = (message) => {
  notification.success({
    message,
  });
};

const AddEditArticle = (props) => {
  const {
    history,
    addArticle,
    getArticle,
    updateArticle,
    deleteArticle,
    match,
    match: {
      params: { slug },
    },
    currentArticle: { fetching, article },
    username,
  } = props;

  let initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  let edit = false;
  let linkToBackOnEditMode = '';

  if (Object.keys(article).length !== 0 && !match.url.includes('/add')) {
    initialValues = {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    };
    edit = true;
    linkToBackOnEditMode = match.url.replace('/edit', '');
  } else if (slug && fetching === 'none') {
    getArticle(slug);
  }

  if (fetching === 'failed') return <Redirect to={match.url.replace('/edit', '')} />;

  if (!match.url.includes('/add') && !edit && fetching !== 'finished') return <Preloader />;

  if (edit && username !== article.author.username) {
    return <Redirect to={match.url.replace('/edit', '')} />;
  }

  return (
    <AddEditArticleWrapper>
      <div className="content">
        <div className="back-arrow">
          <Link to={edit ? linkToBackOnEditMode : HOME_LINK}>&larr;</Link>
        </div>
        {edit ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Edit article "{initialValues.title}"</h1>
            <Button
              onClick={async () => {
                await deleteArticle(slug);
                history.push(HOME_LINK);
                openNotificationWithIcon('Article successful delete');
              }}
              danger
            >
              Delete article
            </Button>
          </div>
        ) : (
          <h1>Add new article</h1>
        )}
        <Divider />

        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, { setErrors }) => {
            try {
              if (edit) {
                const newValues = { ...values };
                if (values.tagList.length === 0) {
                  newValues.tagList = [''];
                }
                await updateArticle(slug, newValues);
                history.push(linkToBackOnEditMode);
                openNotificationWithIcon('Article successful updated');
              } else {
                await addArticle(values);
                history.push(HOME_LINK);
                openNotificationWithIcon('Article successful add');
              }
            } catch (err) {
              const newErrors = formatAddArticleErrorsToFormikErrors(err);
              setErrors(newErrors);
            }
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <InputWrapper>
                <Field
                  as={Input}
                  name="title"
                  placeholder="Title"
                  className={fieldErrorClassNames('title', errors, touched)}
                />
                {errors.title && touched.title && (
                  <span className="error-text">{errors.title}</span>
                )}
              </InputWrapper>
              <InputWrapper>
                <Field
                  as={Input}
                  name="description"
                  placeholder="Short description"
                  className={fieldErrorClassNames('description', errors, touched)}
                />
                {errors.description && touched.description && (
                  <span className="error-text">{errors.description}</span>
                )}
              </InputWrapper>
              <InputWrapper>
                <Field
                  as={Input.TextArea}
                  name="body"
                  autoSize={{ minRows: 5 }}
                  placeholder="Article body"
                  className={fieldErrorClassNames('body', errors, touched)}
                />
                {errors.body && touched.body && <span className="error-text">{errors.body}</span>}
              </InputWrapper>

              <InputWrapper>
                <EditableTagGroup
                  tagList={values.tagList}
                  updateTagList={(tags) => {
                    setFieldValue('tagList', tags);
                  }}
                />
              </InputWrapper>

              {edit ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    htmlType="submit"
                    style={{ backgroundColor: '#3cd03c', color: '#fff', borderColor: '#12ad12' }}
                  >
                    Save
                  </Button>

                  <Button danger>
                    <Link to={linkToBackOnEditMode}>Cancel</Link>
                  </Button>
                </div>
              ) : (
                <Button type="primary" htmlType="submit">
                  Add article
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </AddEditArticleWrapper>
  );
};

const AddEditArticleWrapper = styled.div`
  width: 100%;

  & .content {
    position: relative;
    margin: 0 auto;
  }

  & .back-arrow {
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
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;

  & .error {
    border-color: tomato;
  }

  & .error-text {
    margin-left: 5px;
    color: tomato;
  }
`;

AddEditArticle.defaultProps = {
  username: '',
};

AddEditArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  username: PropTypes.string,
  currentArticle: PropTypes.instanceOf(Object).isRequired,
};

const IfTockenExists = AuthWithTocken(AddEditArticle);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IfTockenExists));
