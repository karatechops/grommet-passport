import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import FormInput from '../../components/FormInput';
import { submitRequest } from './actions';

export class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(data) {
    if (!data.password) {
      throw new SubmissionError({ 
        password: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (data.password.length < 8) {
      throw new SubmissionError({ 
        password: 'Minimum 8 characters',
        _error: 'Required fields empty.'
      });
    };

    if (!data.passwordConfirm) {
      throw new SubmissionError({ 
        passwordConfirm: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (data.passwordConfirm.length < 8) {
      throw new SubmissionError({ 
        passwordConfirm: 'Minimum 8 characters',
        _error: 'Required fields empty.'
      });
    } else if (data.passwordConfirm !== data.password) {
      throw new SubmissionError({ 
        passwordConfirm: 'Password does not match',
        _error: 'Passwords do not match.'
      });
    };
    const formData = {
      ...data, 
      guid: this.props.guid
    };

    this.props.dispatch(submitRequest(formData));
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

    const successMsg = (this.props.profileId !== '')
      ? <Paragraph>Your password has been reset. Visit the&nbsp;
          <Anchor path="/">login page</Anchor> to login.</Paragraph>
      : '';

    return (
      <Box pad="medium">
        <Form onSubmit={onSubmit}>
          <Box pad={{ vertical: 'medium' }}>
            {successMsg}
            <Heading tag="h3" margin="none">
              Password
            </Heading>
          </Box>
          <Field name="password" component={FormInput} 
            customProps={{
              id: 'password',
              label: 'Password',
              password: true
            }}
          />
          <Field name="passwordConfirm" component={FormInput} 
            customProps={{
              id: 'passwordConfirm',
              label: 'Confirm Password',
              password: true
            }}
          />

          <Footer 
            pad={{ vertical: 'medium', between: 'small' }} 
            direction="column"
            align="start">
            {error}
            <Button primary={true} label="Submit" onClick={onSubmit} />
          </Footer>
        </Form>
      </Box>
    );
  }
};

ResetPasswordForm = reduxForm({
  form: 'forgotPassword'
})(ResetPasswordForm);

ResetPasswordForm = connect(
  state => ({
    request: state.forgotPassword.request,
    requestError: state.forgotPassword.error,
    profileId: state.forgotPassword.profileId
  })
)(ResetPasswordForm);

export default ResetPasswordForm;
