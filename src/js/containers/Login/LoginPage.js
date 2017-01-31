import React, { Component } from 'react';

import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Layer from 'grommet/components/Layer';
import Paragraph from 'grommet/components/Paragraph';
import LoginForm from './form';
import Logo from '../../components/Logo';
import UserPage from '../User/UserPage';
import ForgotPasswordPage from '../ForgotPassword/ForgotPasswordPage';
import ForgotIdPage from '../ForgotId/ForgotIdPage';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layerActive: false,
      layerOptions: [
        'create',
        'id',
        'pass'
      ],
      layerComponent: <UserPage />
    };

    this._toggleLayer = this._toggleLayer.bind(this);
    this._closeLayer = this._closeLayer.bind(this);
  }

  componentDidMount() {
    if (this.props.params.guid)
      this._toggleLayer(this.state.layerOptions[2]);
  }

  _toggleLayer(layerType) {
    let layerComponent;

    switch(layerType) {
      case this.state.layerOptions[0]:
        layerComponent = <UserPage />;
        break;
      case this.state.layerOptions[1]:
        layerComponent = <ForgotIdPage />;
        break;
      case this.state.layerOptions[2]:
        layerComponent = <ForgotPasswordPage params={this.props.params} />;
        break;
    }

    this.setState({
      layerActive: true,
      layerComponent
    });
  }

  _closeLayer() {
    this.setState({ layerActive: false });
  }

  render() {
    const layer = (this.state.layerActive)
      ? <Layer align="right" closer={true} onClose={this._closeLayer}>
          {this.state.layerComponent}
        </Layer>
      : undefined;

    return (
      <Box pad="medium" justify="center"
        align="start">
        {layer}
        <Box direction="row" full="horizontal" pad={{ between: 'large' }} wrap={true}>
          <Box basis="1/2">
            {/* Using row to get the correct width of the nested box */}
            <Box direction="row" justify="end">
              <Box>
                <Box pad={{ vertical: 'large' }}>
                  <Logo width={240} />
                </Box>
                <Headline margin="none" style={{ letterSpacing: '.15em' }}>
                  PASSPORT
                </Headline>
                <Paragraph>
                  The Hewlett Packard Enterprise Passport allows customers, partners,
                  and employees access to HPE content from a variety of tools needed
                  for getting business done.
                </Paragraph>
                <LoginForm 
                  onForgotIdClick={
                    this._toggleLayer.bind(this, this.state.layerOptions[1])
                  } 
                  onForgotPassClick={
                    this._toggleLayer.bind(this, this.state.layerOptions[2])
                  } 
                />
                <Button 
                  primary={true}
                  label="Sign in with HPE Digital Badge" 
                  href="https://cf.passport.hpe.com/athp.fcc?TARGET=http%3A%2F%2Flocalhost%3A8102%2Fdashboard"
                />
              </Box>
            </Box>
          </Box>
          <Box basis="1/2" justify="center"> 
            <Box direction="row" justify="start">
              <Box>
                <Box pad="medium" />
                <Heading margin="none" tag="h2">
                  Create an HPE Passport Account
                </Heading>
                <Paragraph margin="small">
                  If you are accessing any of the HPE Tools for the first time you will
                  need to create an HPE Passport account. By creating an account you
                  will be registering to use all of the HPE Tools for free.
                </Paragraph>
                <Paragraph margin="small">
                  If you are an HPE employee you can use your employee credentials to 
                  sign in. If you are an HPE employee with an existing HPE Passport 
                  account, use the "reset account" to make changes.
                </Paragraph>
                <Box direction="row" pad={{ vertical: 'medium' }}>
                  <Button label="Create Account" 
                    onClick={this._toggleLayer.bind(this, this.state.layerOptions[0])} />
                </Box>
                <Anchor path="#">Reset Account</Anchor>
              </Box>
            </Box>
          </Box>
        </Box>
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
