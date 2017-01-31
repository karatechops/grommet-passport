import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageMarquee from '../../components/PageMarquee';
import ForgotPasswordForm from './form';
import ResetPasswordForm from './formReset';

export class ForgotPasswordPage extends Component {

  render() {
    const guid = this.props.params.guid || '';

    const form = (guid)
      ? <ResetPasswordForm guid={guid} />
      : <ForgotPasswordForm />;

    return (
      <Box align="center">
        <PageMarquee title={'Forgot Password'} />
        {form}
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  const { user } = state;

  return {
    user
  };
}

export default connect(mapStateToProps)(ForgotPasswordPage);
