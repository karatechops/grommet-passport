import React, { PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

const FormHeader = ({title, body}) =>
  <Box pad="medium" size={{ width: { max: 'medium' } }} 
    textAlign="center" alignSelf="center">
    <Heading tag="h2" margin="none">
      {title}
    </Heading>
    {body}
  </Box>;

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.node
};

export default FormHeader;
