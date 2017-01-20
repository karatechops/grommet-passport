import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';

export class index extends Component {
  render() {
    return (
      <Box>
        Dashboard Page
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  return {

  };
}

export default connect(mapStateToProps)(index);
