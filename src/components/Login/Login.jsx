import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import classNames from 'classnames';
import * as actions from '../../actions';
import { REGISTER_LINK } from '../../routes/endpoints';
import AuthWithTocken from '../../hoc/AuthWithTocken';
import 'antd/dist/antd.css';

const mapStateToProps = (state) => {
  const props = {
    userLoginFetching: state.userLoginFetching,
    user: state.user,
  };

  return props;
};

const mapDispatchToProps = {
  singin: actions.loginUser,
};

const Login = (props) => {
  const { user, userLoginFetching, singin } = props;

  const fieldErrorClassNames = (field, errors, touched) => {
    return classNames({ error: errors[field] && touched[field] });
  };

  return (
    <div className="content">
      <h1>Autorization:</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          singin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <InputWrapper>
              <Field
                as={Input}
                className={fieldErrorClassNames('email', errors, touched)}
                type="email"
                name="email"
                placeholder="Email"
                disabled={userLoginFetching === 'requested'}
              />
            </InputWrapper>
            <InputWrapper>
              <Field
                as={Input.Password}
                className={fieldErrorClassNames('password', errors, touched)}
                name="password"
                placeholder="Input your password"
                disabled={userLoginFetching === 'requested'}
              />
            </InputWrapper>
            <ButtonsWrapper>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={userLoginFetching === 'requested'}
                >
                  Sing In
                </Button>
                {user.errors && <span className="error">{user.errors}</span>}
              </div>
              <Button type="link">
                <Link to={REGISTER_LINK}>Create a new user</Link>
              </Button>
            </ButtonsWrapper>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & .error {
    margin-left: 20px;
    color: tomato;
  }
`;

Login.defaultProps = {
  user: {},
};

Login.propTypes = {
  user: PropTypes.instanceOf(Object),
  userLoginFetching: PropTypes.string.isRequired,
  singin: PropTypes.func.isRequired,
};

const IfTockenExists = AuthWithTocken(Login);

export default connect(mapStateToProps, mapDispatchToProps)(IfTockenExists);
