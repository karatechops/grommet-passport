import React from 'react';

import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

const FormInput = ({ customProps = {}, input, meta }) => (
  <FormField label={customProps.label} htmlFor={customProps.id} 
      error={meta.error}>
    <TextInput 
      onDOMChange={param => input.onChange(param.target.value)}
      value={input.value} 
      placeHolder={customProps.placeHolder || undefined} 
      type={(customProps.password) ? 'password' : 'text'}
    />
  </FormField>
);

export default FormInput;
