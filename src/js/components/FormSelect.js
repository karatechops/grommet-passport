import React from 'react';

import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

const FormSelect = ({ customProps= {}, input, meta: { touched, error } }) => (
  <FormField label={customProps.label} htmlFor={customProps.id}>
    <Select placeHolder='Search'
      options={customProps.options}
      value={input.value || customProps.defaultValue}
      onSearch={ 
        (customProps.onSearch)
          ? customProps.onSearch.bind(
              this, customProps.allOptions, customProps.stateKey)
          : undefined
      }
      onChange={param => input.onChange(param.value)} />
  </FormField>
);

export default FormSelect;
