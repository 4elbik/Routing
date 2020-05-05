import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import classNames from 'classnames';
import 'antd/dist/antd.css';

const Login = () => {
  const fieldErrorClassNames = (field, errors, touched) => {
    return classNames({ error: errors[field] && touched[field] })
  }
  
  return (
    <div className="content">
      <h1>Autorization:</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async ( values, { setSubmitting } ) => {
          console.log(values, 'Значения пришедшие из формы формика');
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <InputWrapper>
              <Field as={Input} className={fieldErrorClassNames('email', errors, touched)} type="email" name="email" placeholder="Email" />
            </InputWrapper>
            <InputWrapper>
              <Field as={Input.Password} className={fieldErrorClassNames('password', errors, touched)} name="password" placeholder="Input your password" />
            </InputWrapper>
            <ButtonsWrapper>
              <Button type="primary" htmlType="submit">Sign In</Button>
              <Button type="link"><a href="/signup">Create a new user</a></Button>
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

export default Login;
