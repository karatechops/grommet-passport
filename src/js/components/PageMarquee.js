import React, { PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

const PageMarquee = ({ title, image }) =>
  <Box 
    size={{ height: 'small' }}
    colorIndex="grey-3"
    full="horizontal"
    align="center"
    justify="center"
    texture={image}
  >
    <Heading>
      {title}
    </Heading>
  </Box>;

PageMarquee.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string
};

export default PageMarquee;
