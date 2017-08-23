import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import TextInput from '../common/input/text/text';
import Dropdown from '../common/input/dropdown/dropdown';
import Button from '../common/input/button/button';

import './details-form.scss';

const inputFields = {
  salary: {
    type: 'number',
    label: 'Salary',
    preAddOn: '£',
    placeholder: 'Gross annual income',
    onFocus: () => {},
  },
  loan: {
    type: 'number',
    label: 'Loan balance',
    preAddOn: '£',
    placeholder: 'Current balance of your loan',
    onFocus: () => {},
  },
  salaryInc: {
    type: 'number',
    label: 'Annual salary increase',
    defaultVal: '2.5',
    postAddOn: '%',
    onFocus: (evt) => {
      evt.target.select();
    },
  },
};

function getDefaultInputValues() {
  const defaultVals = {};
  Object.keys(inputFields).forEach((k) => {
    defaultVals[k] = inputFields[k].defaultVal;
    delete inputFields[k].defaultVal;
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
        {Object.keys(inputFields).map(k => (
          <Field
            {...inputFields[k]}
            name={k}
            key={k}
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
  return {
    ...!values.loan && { loan: 'Please enter a value' },
  };
}

export default reduxForm({
  validate,
  form: 'form',
  initialValues: {
    ...getDefaultInputValues(),
  },
})(DetailsForm);
