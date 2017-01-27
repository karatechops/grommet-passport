import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
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
import { userCreate } from './actions';
import { LANGUAGES, COUNTRIES } from './constants';
import { objArrayFind, validEmail } from '../../utils';

const renderInput = ({ customProps = {}, input, meta }) => (
  <FormField label={customProps.label} htmlFor={customProps.id} 
      error={meta.error}>
    <TextInput 
      onDOMChange={param => input.onChange(param.target.value)}
      value={input.value} 
      placeHolder={customProps.placeHolder || undefined} 
    />
  </FormField>
);

const renderSelect = ({ customProps= {}, input, meta: { touched, error } }) => (
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
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSearch(allOptions, key, event) {
    const regexp = new RegExp('^' + event.target.value, 'i');
    const nextOptions =
      allOptions.filter(option => regexp.test(option.label || option));
    let obj  = {};
    obj[key] = nextOptions;

    this.setState(obj);
  }

  _onSubmit(data) {
    if (!data.userId) {
      throw new SubmissionError({ 
        userId: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (data.userId.length < 5) {
      throw new SubmissionError({ 
        userId: 'Must be 5 characters or more',
        _error: 'User ID error.'
      });
    }

    if (!data.password) {
      throw new SubmissionError({ 
        password: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (data.password.length < 8) {
      throw new SubmissionError({ 
        password: 'Minimum 8 characters',
        _error: 'Required fields empty.'
      });
    };

    if (!data.passwordConfirm) {
      throw new SubmissionError({ 
        passwordConfirm: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (data.passwordConfirm.length < 8) {
      throw new SubmissionError({ 
        passwordConfirm: 'Minimum 8 characters',
        _error: 'Required fields empty.'
      });
    } else if (data.passwordConfirm !== data.password) {
      throw new SubmissionError({ 
        passwordConfirm: 'Password does not match',
        _error: 'Passwords do not match.'
      });
    };

    if (data.securityQuestion1.value === data.securityQuestion2.value) {
      throw new SubmissionError({ 
        securityQuestion2: 'Choose a different question.',
        _error: 'Security questions cannot be the same.'
      });
    }

    const invalidChars = /[&|*"`]+/;
    
    if (!data.securityAnswer1) {
      throw new SubmissionError({ 
        securityAnswer1: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (invalidChars.test(data.securityAnswer1)) {
      throw new SubmissionError({ 
        securityAnswer1: 'Security answer cannot have & | * " `',
        _error: 'Invalid security answer.'
      });
    }

    if (!data.securityAnswer2) {
      throw new SubmissionError({ 
        securityAnswer2: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (invalidChars.test(data.securityAnswer2)) {
      throw new SubmissionError({ 
        securityAnswer2: 'Security answer cannot have & | * " `',
        _error: 'Invalid security answer.'
      });
    }

    if (!data.firstName) {
      throw new SubmissionError({ 
        firstName: 'Required',
        _error: 'Required fields empty.'
      });
    }

    if (!data.lastName) {
      throw new SubmissionError({ 
        lastName: 'Required',
        _error: 'Required fields empty.'
      });
    }

    if (!data.emailAddress) {
      throw new SubmissionError({ 
        emailAddress: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (!validEmail(data.emailAddress)) {
      throw new SubmissionError({ 
        emailAddress: 'Invalid email',
        _error: 'Email address invalid.'
      });
    }

    this.props.dispatch(userCreate(data));
  }

  _renderNewUserFields() {
    return (
      <Box>
        <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            Login Information
          </Heading>
        </Box>
        <Field name="userId" component={renderInput} 
          customProps={{
            placeHolder: 'Typically your e-mail address.',
            id: 'userId',
            label: 'User ID'
          }}
        />
        <Field name="password" component={renderInput} 
          customProps={{
            placeHolder: 'Minimum 8 letters, numbers and special characters.',
            id: 'password',
            label: 'Password'
          }}
        />
        <Field name="passwordConfirm" component={renderInput} 
          customProps={{
            id: 'passwordConfirm',
            label: 'Confirm Password'
          }}
        />
        <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            Forgot Password Information
          </Heading>
        </Box>
        <Field name="securityQuestion1" component={renderSelect} 
          customProps={{
            id: 'securityQuestion1',
            label: 'Security Question 1',
            options: this.props.questions,
            defaultValue: (this.props.questions.length > 0) 
              ? this.props.questions[0]
              : undefined
          }}
        />
        <Field name="securityAnswer1" component={renderInput} 
          customProps={{
            placeHolder: 'Security answer cannot have & | * " `',
            id: 'securityAnswer1',
            label: 'Security Answer 1'
          }}
        />
        <Field name="securityQuestion2" component={renderSelect} 
          customProps={{
            id: 'securityQuestion2',
            label: 'Security Question 2',
            options: this.props.questions,
            defaultValue: (this.props.questions.length > 0) 
              ? this.props.questions[1]
              : undefined
          }}
        />
        <Field name="securityAnswer2" component={renderInput} 
          customProps={{
            placeHolder: 'Security answer cannot have & | * " `',
            id: 'securityAnswer2',
            label: 'Security Answer 2'
          }}
        />
      </Box>);
  }

  render() {
    const onSubmit = this.props.handleSubmit(this._onSubmit);

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

    const error = (this.props.error || this.props.requestError)
      ? <Box style=
          {{
            color: '#f04953'
          }}
        >
          {this.props.error || this.props.requestError}
        </Box>
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
          <Field name="firstName" component={renderInput} 
            customProps={{
              id: 'firstName',
              label: 'First Name'
            }}
          />
          <Field name="lastName" component={renderInput} 
            customProps={{
              id: 'lastName',
              label: 'Last Name'
            }}
          />
          <Field name="emailAddress" component={renderInput} 
            customProps={{
              id: 'emailAddress',
              label: 'Email Address'
            }}
          />
          <Field name="preferredLanguage" component={renderSelect} 
            customProps={{ 
              id: 'preferredLanguage',
              label: 'Preferred Language',
              onSearch: this._onSearch,
              options: this.state.languageOptions,
              allOptions: LANGUAGES,
              stateKey: 'languageOptions'
            }} 
          />
          <Field name="residentCountryCode" component={renderSelect} 
            customProps={{ 
              id: 'residentCountryCode',
              label: 'Country / Region of residence',
              onSearch: this._onSearch,
              options: this.state.countryOptions,
              allOptions: COUNTRIES,
              stateKey: 'countryOptions'
            }} 
          />

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

          <Footer 
            pad={{ vertical: 'medium', between: 'small' }} 
            direction="column"
            align="start">
            {error}
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
      contactByEmail: state.user.contactByEmail,
      contactByMail: state.user.contactByMail,
      contactByPhone: state.user.contactByPhone,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      localizationCode: state.user.localizationCode,
      preferredLanguage: state.user.preferredLanguage,
      residentCountryCode: state.user.residentCountryCode,
      securityLevel: state.user.securityLevel,
      preferredLanguage: {
        label: LANGUAGES.find(objArrayFind.bind(this, state.user.preferredLanguage)).label,
        value: state.user.preferredLanguage
      },
      residentCountryCode: {
        label: COUNTRIES.find(objArrayFind.bind(this, state.user.residentCountryCode)).label,
        value: state.user.residentCountryCode
      },
      securityQuestion1: {
        label: state.user.questions[0].label,
        value: state.user.questions[0].value
      },
      securityQuestion2: {
        label: state.user.questions[1].label,
        value: state.user.questions[1].value
      }
    },
    questions: state.user.questions,
    request: state.user.request,
    requestError: state.user.error
  })
)(UserForm);

export default UserForm;
