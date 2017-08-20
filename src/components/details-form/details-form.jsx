import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import TextInput from '../common/input/text/text';
import Button from '../common/input/button/button';

const fields = {
  salary: {
    type: 'number',
    label: 'Salary',
    preAddOn: '£',
  },
  loan: {
    type: 'number',
    label: 'Loan balance',
    preAddOn: '£',
  },
  salaryInc: {
    type: 'number',
    label: 'Annual salary increase',
    defaultVal: '2.5',
    postAddOn: '%',
  },
};

function getDefaultValues() {
  const defaultVals = {};
  Object.keys(fields).forEach((k) => {
    defaultVals[k] = fields[k].defaultVal;
    delete fields[k].defaultVal;
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
    return (
      <div className="row">
        {Object.keys(fields).map(k => (
          <Field
            {...fields[k]}
            name={k}
            key={k}
            responsiveClass="col-sm-6"
            component={TextInput}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} noValidate method="" >
        {this.renderFields()}
        <Button label="Calculate" />
      </form>
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
    ...getDefaultValues(),
  },
})(DetailsForm);
