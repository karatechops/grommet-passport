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

const renderInput = ({ customProps = {}, input}) => (
  <TextInput 
    onDOMChange={param => input.onChange(param.target.value)}
    value={input.value} 
    placeHolder={customProps.placeHolder || undefined} />
);

const renderSelect = ({ customProps, input }) => (
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
);

const renderRadioSelect = props => (
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

export class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageOptions: LANGUAGES,
      countryOptions: COUNTRIES
    };

    this._onSearch = this._onSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps);
  }

  _onSearch(allOptions, key, event) {
    const regexp = new RegExp('^' + event.target.value, 'i');
    const nextOptions =
      allOptions.filter(option => regexp.test(option.label || option));
    let obj  = {};
    obj[key] = nextOptions;

    this.setState(obj);
  }

  _renderNewUserFields() {
    return (
      <Box>
        <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            Login Information
          </Heading>
        </Box>
        <FormField label="User ID" htmlFor="userId">
          <Field name="userId" component={renderInput} 
            customProps={{
              placeHolder: 'Typically your e-mail address.'
            }}
          />
        </FormField>
        <FormField label="Password" htmlFor="password">
          <Field name="password" component={renderInput} 
            customProps={{
              placeHolder: 'Minimum 8 letters, numbers and special characters.'
            }}
          />
        </FormField>
        <FormField label="Confrm Password" htmlFor="passwordConfirm">
          <Field name="passwordConfirm" component={renderInput} />
        </FormField>
        <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            Forgot Password Information
          </Heading>
        </Box>
        <FormField label="Security Question 1" htmlFor="securityQuestion1">
          <Field name="securityQuestion1" component={renderSelect} 
            customProps={{
              options: this.props.questions,
              defaultValue: (this.props.questions.length > 0) 
                ? this.props.questions[0]
                : undefined
            }}
          />
        </FormField>
        <FormField label="Security Answer 1" htmlFor="securityAnswer1">
          <Field name="securityAnswer1" component={renderInput} 
            customProps={{
              placeHolder: 'Security answer cannot have & | * " `'
            }}
          />
        </FormField>
        <FormField label="Security Question 2" htmlFor="securityQuestion2">
          <Field name="securityQuestion2" component={renderSelect} 
            customProps={{
              options: this.props.questions,
              defaultValue: (this.props.questions.length > 0) 
                ? this.props.questions[1]
                : undefined
            }}
          />
        </FormField>
        <FormField label="Security Answer 2" htmlFor="securityAnswer2">
          <Field name="securityAnswer2" component={renderInput} 
            customProps={{
              placeHolder: 'Security answer cannot have & | * " `'
            }}
          />
        </FormField>
      </Box>);
  }

  render() {
    const { onSubmit } = this.props;
    const { emailAddress } = this.props.initialValues;

    const emailBlock = (emailAddress)
      ? <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            Email address <strong>{emailAddress}</strong>
          </Heading>
        </Box>
      : undefined;

    const newUserFields = (!emailAddress)
      ? this._renderNewUserFields()
      : undefined;

    return (
      <Box pad="medium">
        {emailBlock}
        <Form onSubmit={onSubmit}>
          
          {newUserFields}

          <Box pad={{ vertical: 'medium' }}>
            <Heading tag="h3" margin="none">
              Personal Information
            </Heading>
          </Box>
          <FormField label="First Name" htmlFor="firstName">
            <Field name="firstName" component={renderInput} />
          </FormField>
          <FormField label="Last Name" htmlFor="lastName">
            <Field name="lastName" component={renderInput} />
          </FormField>
          <FormField label="Preferred Language" htmlFor="preferredLanguage">
            <Field name="preferredLanguage" component={renderSelect} 
              customProps={{ 
                onSearch: this._onSearch,
                options: this.state.languageOptions,
                allOptions: LANGUAGES,
                stateKey: 'languageOptions'
              }} />
          </FormField>
          <FormField label="Country / Region of residence" htmlFor="residentCountryCode">
            <Field name="residentCountryCode" component={renderSelect} 
              customProps={{ 
                onSearch: this._onSearch,
                options: this.state.countryOptions,
                allOptions: COUNTRIES,
                stateKey: 'countryOptions'
              }} />
          </FormField>

          <Box separator="bottom" pad={{ vertical: 'medium' }}>
            <Heading tag="h3" margin="none">
              Contact Preferences
            </Heading>
          </Box>
          <Box>
            <Paragraph>
              HPE occasionally communicates information that may interest you (product, 
              service, and support information, special offers, or market research 
              invitations). Before you choose, visit our Online Privacy Statement 
              to learn how we use automatic data collection tools and your 
              personal information to tailor your communications.
            </Paragraph>
          </Box>
          <Box direction="row" align="center" pad={{ between: 'medium' }}>
            <Paragraph>
              May HPE contact you by email?
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
    },
    questions: state.user.questions
  })
)(UserForm);

export default UserForm;
