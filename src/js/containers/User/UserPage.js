import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageMarquee from '../../components/PageMarquee';
import UserForm from './form';
import { getUserQuestions } from './actions';

export class UserPage extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getUserQuestions());
  }

  _onSubmit(data) {
    console.log(data);
  }

  render() {
    const { pathname } = this.props.location;
    const title = (pathname === '/register')
      ? 'Create User'
      : 'Edit User';

    return (
      <Box align="center">
        <PageMarquee title={title} />
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
