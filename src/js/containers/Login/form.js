import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormInput from '../../components/FormInput';
import { login } from './actions';

export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(data) {
    if (!data.username) {
      throw new SubmissionError({ 
        username: 'Required'
      });
    } else if (data.username.length < 5) {
      throw new SubmissionError({ 
        username: 'Must be 5 characters or more'
      });
    }

    if (!data.password.length) {
      throw new SubmissionError({ 
        password: 'Required'
      });
    };

    this.props.dispatch(login(data));
  }

  render() {
    const onSubmit = this.props.handleSubmit(this._onSubmit);

    const error = (this.props.requestError)
      ? <Box style=
          {{
            color: '#f04953'
          }}
        >
          {this.props.requestError}
        </Box>
      : undefined;

    return (
      <Box>
        <Form onSubmit={onSubmit}>
          <Field name="username" component={FormInput} 
            customProps={{
              id: 'username',
              label: 'User ID',
              placeHolder: 'Typically an email address.'
            }}
          />
          <Field name="password" component={FormInput} 
            customProps={{
              id: 'password',
              label: 'Password',
              password: true
            }}
          />

          <Footer 
            pad={{ vertical: 'medium', between: 'small' }} 
            direction="column"
            align="start">
            {error}

            <Box direction="row" pad={{ between: 'medium' }}>
              <Anchor onClick={this.props.onForgotIdClick}>
                Forgot User ID?
                </Anchor>
              <Anchor onClick={this.props.onForgotPassClick}>
                Forgot Password?
              </Anchor>
            </Box>
            <Box full="horizontal">
              <Button primary={true} label="Sign in" onClick={onSubmit} />
            </Box>
          </Footer>
        </Form>
      </Box>
    );
  }
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

LoginForm = connect(
  state => ({
    initialValues: {
      username: '',
      password: ''
    },
    request: state.login.request,
    requestError: state.login.error,
    sessionId: state.login.sessionId
  })
)(LoginForm);

export default LoginForm;
