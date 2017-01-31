import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import TextInput from 'grommet/components/TextInput';
import { submitRequest } from './actions';
import { validEmail } from '../../utils';

const renderInput = ({ customProps = {}, input, meta }) => (
  <FormField label={customProps.label} htmlFor={customProps.id} 
      error={meta.error}>
    <TextInput 
      onDOMChange={param => input.onChange(param.target.value)}
      value={input.value} 
      placeHolder={customProps.placeHolder || undefined} 
      type={(customProps.password) ? 'password' : 'text'}
    />
  </FormField>
);

export class ForgotUserIdPage extends Component {
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

    console.log('submit', data);
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
      ? <Paragraph>An email will be sent shortly with your user ID.</Paragraph>
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
          <Field name="emailAddress" component={renderInput} 
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

ForgotUserIdPage = reduxForm({
  form: 'forgotId'
})(ForgotUserIdPage);

ForgotUserIdPage = connect(
  state => ({
    request: state.forgotId.request,
    requestError: state.forgotId.error,
    profileId: state.forgotId.profileId
  })
)(ForgotUserIdPage);

export default ForgotUserIdPage;
