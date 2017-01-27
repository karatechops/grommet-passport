import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import PageMarquee from '../../components/PageMarquee';
import UserForm from './form';
import { getUserQuestions } from './actions';

export class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getUserQuestions());
  }

  render() {
    const { pathname } = this.props.location;
    const title = (pathname === '/register')
      ? 'Create User'
      : 'Edit User';

    // The security question list needs to be loaded before the form
    // is rendered. Maybe these questions can be static? It seems
    // like an extreneous request to gather this every form 
    // page request.
    const form = (this.props.user.questions.length > 0)
      ? <UserForm />
      : <Box direction="row" 
          pad={{ 
            vertical: 'medium',
            horizontal: 'medium',
            between: 'small' 
          }}
        >
          <Spinning />
          <Box>
            Loading form data.
          </Box>
        </Box>;

    return (
      <Box align="center">
        <PageMarquee title={title} />
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

export default connect(mapStateToProps)(UserPage);
