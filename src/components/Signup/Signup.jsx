import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import classNames from 'classnames';
import * as actions from '../../actions';
import { formatRegisterErrorsToFormikErrors } from '../../utilities';
import 'antd/dist/antd.css';

const mapStateToProps = (state) => {
  const props = {
    userRegisterFething: state.userRegisterFething,
  };

  return props;
};

const mapDispatchToProps = {
  register: actions.registerUser,
};

class Signup extends React.Component {
  state = {
    redirect: false,
  };

  componentDidUpdate() {
    const { userRegisterFething } = this.props;
    if (userRegisterFething === 'finished') {
      this.setRedirect();
    }
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return null;
  };

  render() {
    const { userRegisterFething, register } = this.props;

    const fieldErrorClassNames = (field, errors, touched) => {
      return classNames({ error: errors[field] && touched[field] });
    };

    return (
      <div className="content">
        <h1>Register a new user account:</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              await register(values);
            } catch (err) {
              const newErrors = formatRegisterErrorsToFormikErrors(err);
              setErrors(newErrors);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <InputWrapper>
                <Field
                  as={Input}
                  className={fieldErrorClassNames('username', errors, touched)}
                  name="username"
                  placeholder="Username"
                />
                {errors.username && touched.username && (
                  <span className="error-text">{errors.username}</span>
                )}
              </InputWrapper>
              <InputWrapper>
                <Field
                  as={Input}
                  className={fieldErrorClassNames('email', errors, touched)}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </InputWrapper>
              <InputWrapper>
                <Field
                  as={Input.Password}
                  className={fieldErrorClassNames('password', errors, touched)}
                  name="password"
                  placeholder="Input your password"
                />
                {errors.password && touched.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </InputWrapper>
              <ButtonsWrapper>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={userRegisterFething === 'requested'}
                >
                  Sign Up
                </Button>
                <Button type="link">
                  <Link to="/login">Login</Link>
                </Button>
              </ButtonsWrapper>
            </Form>
          )}
        </Formik>
        {this.renderRedirect()}
      </div>
    );
  }
}

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
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

Signup.propTypes = {
  userRegisterFething: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
