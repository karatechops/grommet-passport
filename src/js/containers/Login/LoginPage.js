import React, { Component } from 'react';

import { connect } from 'react-redux';
import { login } from './actions';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import LoginForm from 'grommet/components/LoginForm';
import AppIcon from 'grommet/components/icons/base/BrandHpeElementPath';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };

    this._onSubmitClick = this._onSubmitClick.bind(this);
  }

  componentWillReceiveProps({ request, error}) {
    this.setState({ error });
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
    const onSubmitClick = (!this.props.request)
      ? this._onSubmitClick
      : undefined;

    return (
      <Box full={true} pad="medium" justify="center"
        align="center">
        <AppIcon size="xlarge" colorIndex="brand" />
        <Heading margin="none">
          Passport
        </Heading>
        <LoginForm
          align="center"
          onSubmit={onSubmitClick}
          rememberMe={true}
          forgotPassword={
            <Anchor 
              href='#'
              label='Forgot password?' 
            />
          }
        />
        <Button 
          primary={true}
          label="Log in with HPE Digital Badge" 
          href="https://cf.passport.hpe.com/athp.fcc?TARGET=http%3A%2F%2Flocalhost%3A3000%2Fdashboard"
        />
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  const { request, error, sessionId } = state.login;
  return {
    request,
    error, 
    sessionId
  };
}

export default connect(mapStateToProps)(LoginPage);
