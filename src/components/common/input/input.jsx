import React, { Component } from 'react';

export default class Input extends Component {
  renderAddon(pre, content) {
    const classes = `field__addon--${pre ? 'pre' : 'post'}`;
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
    const inputClass = `field__input${touched && '--touched'}`;

    return (
      <div className={containerClass}>
        <div>
          <label
            className="field__label"
            htmlFor={config.name}
          >
            {label}
          </label>

          {preAddOn && this.renderAddon(true, preAddOn)}

          <input
            className={inputClass}
            {...config}
            onFocus={evt => evt.target.select()}
          />

          {postAddOn && this.renderAddon(false, postAddOn)}
        </div>

        <p className="field__error">{error}</p>
      </div>
    );
  }
}
