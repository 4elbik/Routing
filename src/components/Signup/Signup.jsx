import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import classNames from 'classnames';
import 'antd/dist/antd.css';

const Signup = () => {
  const fieldErrorClassNames = (field, errors, touched) => {
    return classNames({ error: errors[field] && touched[field] })
  }

  return (
    <div className="content">
      <h1>Register a new user account:</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(values, 'Data from signup file component form');
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <InputWrapper>
              <Field as={Input} className={fieldErrorClassNames('username', errors, touched)} name="username" placeholder="username" />
            </InputWrapper>
            <InputWrapper>
              <Field as={Input} className={fieldErrorClassNames('email', errors, touched)} type="email" name="email" placeholder="Email" />
            </InputWrapper>
            <InputWrapper>
              <Field as={Input.Password} className={fieldErrorClassNames('password', errors, touched)} name="password" placeholder="Input your password" />
            </InputWrapper>
            <ButtonsWrapper>
              <Button type="primary" htmlType="submit">Sign Up</Button>
              <Button type="link"><a href="/login">Login</a></Button>
            </ButtonsWrapper>
            <div>
              <pre>
                { JSON.stringify(values, null, 2) }
              </pre>
            </div>
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
`;

export default Signup;
