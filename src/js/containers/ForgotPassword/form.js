import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import FormInput from '../../components/FormInput';
import { submitRequest } from './actions';
import { validEmail } from '../../utils';

export class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(data) {
    if (!data.emailAddress) {
      throw new SubmissionError({ 
        emailAddress: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (!validEmail(data.emailAddress)) {
      throw new SubmissionError({ 
        emailAddress: 'Invalid email',
        _error: 'Email address invalid.'
      });
    }

    this.props.dispatch(submitRequest(data));
  }

  render() {
    const onSubmit = this.props.handleSubmit(this._onSubmit);

    const error = (this.props.error || this.props.requestError)
      ? <Box style=
          {{
            color: '#f04953'
          }}
        >
          {this.props.error || this.props.requestError}
        </Box>
      : undefined;

    const successMsg = (this.props.profileId !== '')
      ? <Paragraph>An email with instructions to reset your password 
          will be sent shortly.</Paragraph>
      : '';

    return (
      <Box pad="medium">
        <Form onSubmit={onSubmit}>
          <Box pad={{ vertical: 'medium' }}>
            {successMsg}
            <Heading tag="h3" margin="none">
              Email Address
            </Heading>
          </Box>
          <Field name="emailAddress" component={FormInput} 
            customProps={{
              id: 'emailAddress',
              label: 'Email Address'
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

ForgotPasswordForm = reduxForm({
  form: 'forgotPassword'
})(ForgotPasswordForm);

ForgotPasswordForm = connect(
  state => ({
    request: state.forgotPassword.request,
    requestError: state.forgotPassword.error,
    profileId: state.forgotPassword.profileId
  })
)(ForgotPasswordForm);

export default ForgotPasswordForm;
