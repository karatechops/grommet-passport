import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import PageMarquee from '../../components/PageMarquee';

export class DashboardHomePage extends Component {
  render() {
    return (
      <Box align="center">
        <PageMarquee title="Dashboard" />
        <Box pad="large">
          Dashboard Home
        </Box>
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

export default connect(mapStateToProps)(DashboardHomePage);
