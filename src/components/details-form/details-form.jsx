import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Input from '../common/input/input';

class DetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          type="text"
          name="loan"
          component={Input}
        />
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
