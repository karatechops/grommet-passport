import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';

class NotFound extends Component {
  render() {
    return (
      <Box full={true} align='center' justify='center'>
        <Headline strong={true}>404</Headline>
        <Heading>Oops...</Heading>
        <Paragraph size='large' align='center'>
          It seems that you are in the wrong route. Please check your URL and
          try again.
        </Paragraph>
      </Box>
    );
  }
}

export default NotFound;
