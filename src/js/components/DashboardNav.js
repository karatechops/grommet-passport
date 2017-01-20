import React, { PropTypes } from 'react';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import UserIcon from 'grommet/components/icons/base/User';

const DashboardNav = ({ userName, onLogoutClick, onEditClick, onHomeClick }) =>
  <Header colorIndex="neutral-1" size="small">
    <Box 
      full="horizontal"
      pad={{ horizontal: 'medium' }}
      direction="row"
      align="center"
      justify="between"
      responsive={false}
    >

      <Button path="/dashboard" style={{ textDecoration: 'none' }}>
        <Heading tag="h3" margin="none">
          Passport
        </Heading>
      </Button>
      <Box direction="row" align="center" justify="center">
        {userName}
        <Menu icon={<UserIcon />}
          dropAlign={{"right": "right", "top": "top"}}>
          <Anchor path="/dashboard/user">
            Edit User
          </Anchor>
          <Anchor onClick={onLogoutClick}>
            Logout
          </Anchor>
        </Menu>
      </Box>
    </Box>
  </Header>;

DashboardNav.propTypes = {
  userName: PropTypes.string,
  onLogoutClick: PropTypes.func
};

export default DashboardNav;
