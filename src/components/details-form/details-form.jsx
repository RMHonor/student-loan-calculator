import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import TextInput from '../common/input/text/text';
import Dropdown from '../common/input/dropdown/dropdown';
import Button from '../common/input/button/button';

import './details-form.scss';

const inputFields = [
  {
    meta: {
      name: 'salary',
      type: 'number',
      label: 'Salary',
      preAddOn: '£',
      placeholder: 'Gross annual income',
      onFocus: () => {
      },
    },
    validate: (value) => {
      if (!value) {
        return 'Please enter a value';
      } else if (value < 0) {
        return 'Please enter a positive value';
      }

      return true;
    },
  },
  {
    meta: {
      name: 'loan',
      type: 'number',
      label: 'Loan balance',
      preAddOn: '£',
      placeholder: 'Current balance of your loan',
      onFocus: () => {
      },
    },
    validate: (value) => {
      if (!value) {
        return 'Please enter a value';
      } else if (value < 0) {
        return 'Please enter a positive value';
      }

      return true;
    },
  },
  {
    meta: {
      name: 'salaryInc',
      type: 'number',
      label: 'Annual salary increase',
      postAddOn: '%',
      onFocus: (evt) => {
        evt.target.select();
      },
    },
    defaultVal: '2.5',
    validate: value => !value && 'Please enter a value',
  },
];

function getDefaultInputValues() {
  const defaultVals = {};
  inputFields.forEach((input) => {
    defaultVals[input.meta.name] = input.defaultVal;
  });

  return defaultVals;
}

class DetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('submitting');
  }

  renderFields() {
    const dropdownOptions = [];
    for (let i = 2015; i < new Date().getFullYear() + 3; i += 1) {
      dropdownOptions.push({ value: i, label: i });
    }
    return (
      <div className="row">
        {inputFields.map(input => (
          <Field
            {...input.meta}
            key={input.meta.name}
            responsiveClass="col-sm-6"
            component={TextInput}
          />
        ))}
        <Field
          defaultVal="Select year"
          options={dropdownOptions}
          label="Graduation year"
          responsiveClass="col-sm-6"
          name="gradYear"
          component={Dropdown}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="margin--25 form-container padding--10">
        <form onSubmit={this.handleSubmit} noValidate method="">
          {this.renderFields()}
          <Button label="Calculate" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

function validate(values) {
  return Object.assign(
    {},
    ...inputFields.map(input => ({ [input.meta.name]: input.validate(values[input.meta.name]) })),
  );
}

export default reduxForm({
  validate,
  form: 'form',
  initialValues: {
    ...getDefaultInputValues(),
  },
})(DetailsForm);
