import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider, Input, Button, notification } from 'antd';
import styled from 'styled-components';
import classNames from 'classnames';
import AuthWithTocken from '../../hoc/AuthWithTocken';
import EditableTagGroup from '../AddTags';
import * as actionsArticles from '../../actions/articles';
import { formatAddArticleErrorsToFormikErrors } from '../../utilities/formatServerErrors';
import { HOME_LINK } from '../../routes/endpoints';

const mapDispatchToProps = {
  addArticle: actionsArticles.addArticle,
  updateArticle: actionsArticles.updateArticle,
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
    updateArticle,
    deleteArticle = () => {},
    initialValues = {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
    edit = false,
    returnToArticle = () => {},
    slug = '',
  } = props;

  return (
    <div className="content add-article-wrapper">
      {edit ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Edit article "{initialValues.title}"</h1>
          <Button onClick={deleteArticle(slug)} danger>Delete article</Button>
        </div>
      ) : <h1>Add new article</h1>}
      <Divider />

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          try {
            if (edit) {
              const newValues = {...values};
              if (values.tagList.length === 0) {
                newValues.tagList = [''];
              }
              await updateArticle(slug, newValues);
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
              {errors.title && touched.title && <span className="error-text">{errors.title}</span>}
            </InputWrapper>
            <InputWrapper>
              <Field
                as={Input}
                name="description"
                placeholder="Short description"
                className={fieldErrorClassNames('description', errors, touched)}
              />
              { (() => { console.log('Тут что-то происходит (AddEditArticle)'); return null })() }
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

                <Button danger onClick={returnToArticle}>
                  Cancel
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
  );
};

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

AddEditArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
};

const IfTockenExists = AuthWithTocken(AddEditArticle);

export default connect(null, mapDispatchToProps)(withRouter(IfTockenExists));
