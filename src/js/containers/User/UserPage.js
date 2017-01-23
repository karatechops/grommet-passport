import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageMarquee from '../../components/PageMarquee';
import UserForm from './form';

export class UserPage extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(data) {
    console.log(data);
  }

  render() {
    return (
      <Box align="center">
        <PageMarquee title="Edit User" />
        <UserForm onSubmit={this._onSubmit} />
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

export default connect(mapStateToProps)(UserPage);
