import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import RadioButton from 'grommet/components/RadioButton';
import Select from 'grommet/components/Select';
import TextInput from 'grommet/components/TextInput';
import { LANGUAGES, COUNTRIES } from './constants';
import { objArrayFind } from '../../utils';

const renderInput = field => (
  <TextInput 
    onDOMChange={param => field.input.onChange(param.target.value)}
    value={field.input.value} />
);

const renderLanguageSelect = field => (
  <Select placeHolder='Search'
    options={field.customProps.options}
    value={field.input.value}
    onSearch={field.customProps.onSearch.bind(this, LANGUAGES, 'languageOptions')}
    onChange={param => field.input.onChange(param.value)} />
);

const renderCountrySelect = field => (
  <Select placeHolder='Search'
    options={field.customProps.options}
    value={field.input.value}
    onSearch={field.customProps.onSearch.bind(this, COUNTRIES, 'countryOptions')}
    onChange={param => field.input.onChange(param.value)} />
);

const renderRadioSelect = field => (
  <span>
    <RadioButton
      id="id2"
      label="Yes"
      checked={(field.input.value === 'Y') ? true : false}
      onChange={param => field.input.onChange('Y')} 
    />
    <RadioButton
      id="id"
      label="No"
      checked={(field.input.value === 'N') ? true : false}
      onChange={param => field.input.onChange('N')} 
    />
  </span>
);

export class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageOptions: LANGUAGES,
      countryOptions: COUNTRIES
    };

    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch(allOptions, key, event) {
    const regexp = new RegExp('^' + event.target.value, 'i');
    const nextOptions =
      allOptions.filter(option => regexp.test(option.label || option));
    let obj  = {};
    obj[key] = nextOptions;

    this.setState(obj);
  }

  render() {
    const { onSubmit } = this.props;
    const { emailAddress } = this.props.initialValues;

    return (
      <Box pad="medium">
        <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            Email address <strong>{emailAddress}</strong>
          </Heading>
        </Box>
        <Form onSubmit={onSubmit}>
          <FormField label="First Name" htmlFor="firstName">
            <Field name="firstName" component={renderInput} />
          </FormField>
          <FormField label="Last Name" htmlFor="lastName">
            <Field name="lastName" component={renderInput} />
          </FormField>
          <FormField label="Preferred Language" htmlFor="preferredLanguage">
            <Field name="preferredLanguage" component={renderLanguageSelect} 
              customProps={{ 
                onSearch: this._onSearch,
                options: this.state.languageOptions 
              }} />
          </FormField>
          <FormField label="Country / Region of residence" htmlFor="residentCountryCode">
            <Field name="residentCountryCode" component={renderCountrySelect} 
              customProps={{ 
                onSearch: this._onSearch,
                options: this.state.countryOptions 
              }} />
          </FormField>

          <Box separator="bottom" pad={{ vertical: 'medium' }}>
            <Heading tag="h3" margin="none">
              Contact Preference
            </Heading>
          </Box>

          <Box direction="row" align="center" pad={{ between: 'medium' }}>
            <Paragraph>
              Contact by email?
            </Paragraph>
            <Field name="contactByEmail" component={renderRadioSelect} />
          </Box>

          <Footer pad={{ vertical: 'medium' }}>
            <Button primary={true} label="Submit" onClick={onSubmit} />
          </Footer>
        </Form>
      </Box>
    );
  }
};

UserForm = reduxForm({
  form: 'user'
})(UserForm);

UserForm = connect(
  state => ({
    initialValues: {
      ...state.user,
      preferredLanguage: {
        label: LANGUAGES.find(objArrayFind.bind(this, state.user.preferredLanguage)).label,
        value: state.user.preferredLanguage
      },
      residentCountryCode: {
        label: COUNTRIES.find(objArrayFind.bind(this, state.user.residentCountryCode)).label,
        value: state.user.residentCountryCode
      }
    }
  })
)(UserForm);

export default UserForm;
