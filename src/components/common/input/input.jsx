import React, { Component } from 'react';

export default class Input extends Component {
  renderAddon(content) {
    const classes = 'field__addon';
    return (
      <span className={classes}>{content}</span>
    );
  }

  render() {
    const {
      meta: { touched, error },
      input,
      responsiveClass,
      label,
      preAddOn,
      postAddOn,
      ...config
    } = this.props;

    const containerClass = `${responsiveClass} field`;
    const inputClass = `field__input ${touched ? 'field__input--touched' : ''}`;

    return (
      <div className={containerClass}>
        <div className="field__container">
          <label
            className="field__label"
            htmlFor={config.name}
          >
            {label}
          </label>

          {preAddOn && this.renderAddon(preAddOn)}

          <input
            className={inputClass}
            {...input}
            {...config}
            onFocus={evt => evt.target.select()}
          />

          {postAddOn && this.renderAddon(postAddOn)}
        </div>

        <p className="field__error">{error}</p>
      </div>
    );
  }
}
