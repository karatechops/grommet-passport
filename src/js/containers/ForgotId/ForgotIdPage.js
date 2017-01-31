import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import ForgotIdForm from './form';

export class ForgotIdPage extends Component {

  render() {
    return (
      <Box align="center">
        <ForgotIdForm />
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

export default connect(mapStateToProps)(ForgotIdPage);
