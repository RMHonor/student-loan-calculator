import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import TextInput from '../common/input/text/text';
import Dropdown from '../common/input/dropdown/dropdown';
import Button from '../common/input/button/button';

import calculate from '../../actions/calculator/action';

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

      return null;
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

      return null;
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
    this.submit = this.submit.bind(this);
  }

  submit(input) {
    this.props.calculate(input);
  }

  renderFields() {
    const dropdownOptions = [];
    for (let i = 2015; i <= new Date().getFullYear(); i += 1) {
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
      <div className="form-container padding--20 padding--top--0">
        <form onSubmit={this.props.handleSubmit(this.submit)} noValidate>
          {this.renderFields()}
          <Button label="Calculate" onClick={this.props.handleSubmit(this.submit)} />
        </form>
      </div>
    );
  }
}

function validate(values) {
  return Object.assign(
    {},
    !values.gradYear && { gradYear: 'Please select your graduation year' },
    ...inputFields.map(input => ({ [input.meta.name]: input.validate(values[input.meta.name]) })),
  );
}

function mapStateToProps({ calculator }) {
  return {
    calculator,
  };
}

export default reduxForm({
  validate,
  form: 'form',
  initialValues: getDefaultInputValues(),
})(connect(mapStateToProps, { calculate })(DetailsForm));
