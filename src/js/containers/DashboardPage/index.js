import React, { Component } from 'react';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import { logout } from '../Login/actions';
import DashboardNav from '../../components/DashboardNav';

export class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this._onLogoutClick = this._onLogoutClick.bind(this);
  }

  _onLogoutClick() {
    this.props.dispatch(logout());
  }

  render() {
    const { firstName, lastName } = this.props;
    return (
      <Box full={true}>
        <DashboardNav 
          userName={`${firstName} ${lastName}`} 
          onLogoutClick={this._onLogoutClick} 
          onEditClick={this._onEditClick}
        />
        {this.props.children}
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  const { firstName, lastName } = state.user;
  return {
    firstName,
    lastName
  };
}

export default connect(mapStateToProps)(DashboardPage);
