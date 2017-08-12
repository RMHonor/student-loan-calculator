import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Input from '../common/input/input';

class DetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFields() {
    const fields = {
      salary: {
        type: 'number',
        label: 'Salary',
        preAddOn: '£',
      },
      loan: {
        type: 'number',
        label: 'Loan balance',
      },
      salaryInc: {
        type: 'number',
        label: 'Annual salary increase',
        defaultValue: '2.5',
        postAddOn: '%',
      },
    };
    return (
      <div className="row">
        {Object.keys(fields).map(k => (
          <Field
            {...fields[k]}
            name={k}
            key={k}
            responsiveClass="col-sm-6"
            component={Input}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        {this.renderFields()}
        <button type="submit" className="btn btn-primary">Calculate</button>
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
  form: 'simple',
})(DetailsForm);
