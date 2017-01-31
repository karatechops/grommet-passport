import React, { Component, PropTypes } from 'react';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Paragraph from 'grommet/components/Paragraph';
import Logo from '../../components/Logo';

class Main extends Component {
  render() {
    return (
      <App centered={false}>
        <Box full={true} justify="center">
          {this.props.children}

          <Footer className="app-footer" size="large" justify="between" 
            pad="medium">
            <Logo width={120} />
            <Paragraph margin='none'>
              © 2017 Hewlett Packard Enterprise Company, L.P.
            </Paragraph>
          </Footer>
        </Box>
      </App>
    );
  }
}

Main.propTypes = {
  children: PropTypes.any.isRequired
};

export default Main;
