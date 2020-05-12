import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import classNames from 'classnames';
import * as actions from '../../actions';
import 'antd/dist/antd.css';

const mapStateToProps = (state) => {
  const props = {
    userLoginFething: state.userLoginFething,
    user: state.user,
  };

  return props;
};

const mapDispatchToProps = {
  signin: actions.loginUser,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.resetButtonRef = React.createRef();
  }

  state = {
    redirect: false,
  };

  componentDidUpdate() {
    const { user, userLoginFething } = this.props;
    if (userLoginFething === 'finished' && !user.errors) {
      this.onResetForm();
      this.setRedirect();
    }
  }

  onResetForm = () => {
    this.resetButtonRef.current.click();
  };

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return null;
  };

  render() {
    const { user, userLoginFething, signin } = this.props;

    const fieldErrorClassNames = (field, errors, touched) => {
      return classNames({ error: errors[field] && touched[field] });
    };

    const initialValues = {
      email: '',
      password: '',
    };

    return (
      <div className="content">
        <h1>Autorization:</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            signin(values);
          }}
        >
          {({ errors, touched, handleReset }) => (
            <Form>
              <InputWrapper>
                <Field
                  as={Input}
                  className={fieldErrorClassNames('email', errors, touched)}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </InputWrapper>
              <InputWrapper>
                <Field
                  as={Input.Password}
                  className={fieldErrorClassNames('password', errors, touched)}
                  name="password"
                  placeholder="Input your password"
                />
              </InputWrapper>
              <ButtonsWrapper>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={userLoginFething === 'requested'}
                  >
                    Sign In
                  </Button>
                  {user.errors && <span className="error">{user.errors}</span>}
                </div>
                <Button type="link">
                  <Link to="/signup">Create a new user</Link>
                </Button>
              </ButtonsWrapper>
              <button
                className="visually-hidden"
                aria-label="Clear form inputs"
                type="button"
                ref={this.resetButtonRef}
                onClick={handleReset}
              />
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
  userLoginFething: PropTypes.string.isRequired,
  signin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
