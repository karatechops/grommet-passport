import React from 'react';

import RadioButton from 'grommet/components/RadioButton';

const FormRadio = props => (
  <span>
    <RadioButton
      id="id2"
      label="Yes"
      checked={(props.input.value === 'Y') ? true : false}
      onChange={param => props.input.onChange('Y')} 
    />
    <RadioButton
      id="id"
      label="No"
      checked={(props.input.value === 'N') ? true : false}
      onChange={param => props.input.onChange('N')} 
    />
  </span>
);

export default FormRadio;
