import React, { Component, PropTypes } from 'react';

import App from 'grommet/components/App';

class Main extends Component {
  render() {
    return (
      <App centered={false}>
        {this.props.children}
      </App>
    );
  }
}

Main.propTypes = {
  children: PropTypes.any.isRequired
};

export default Main;
