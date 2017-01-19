import React, { Component } from 'react';

import { connect } from 'react-redux';
import { login } from './actions';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import LoginForm from 'grommet/components/LoginForm';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: []
    };

    this._onSubmitClick = this._onSubmitClick.bind(this);
  }

  componentWillReceiveProps({ request, error}) {
    this.setState({ error: [error] });
  }

  _onSubmitClick({username, password, rememberMe}) {
    // TODO: Extend validation.
    if (!username)
      this.setState({ error: ['Enter a valid username']});
    if (!password)
      this.setState({ error: ['Enter a valid password']});
    if (!password && !username)
      this.setState({ error: ['Enter a valid username and password'] });
    if (username && password)
      this.props.dispatch(login({ username, password }));
  }

  render() {
    return (
      <Box full={true} pad="medium" justify="center"
        align="center">
        <GrommetIcon size="xlarge" colorIndex="brand" />
        <Heading margin="none">
          Grommet Passport
        </Heading>
        <LoginForm
          align="center"
          errors={this.state.error}
          onSubmit={this._onSubmitClick}
          rememberMe={true}
          forgotPassword={
            <Anchor 
              href='#'
              label='Forgot password?' 
            />
          }
        />
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  const { request, error } = state.login;
  return {
    request,
    error
  };
}

export default connect(mapStateToProps)(LoginPage);
