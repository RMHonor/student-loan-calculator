import React from 'react';
import classNames from 'classnames';

export default (props) => {
  const {
    meta: { touched, error },
    input,
    responsiveClass,
    label,
    preAddOn,
    postAddOn,
    ...config
  } = props;

  let element;
  const containerClass =
    classNames(
      element = 'field__container',
      { [`${element}--error`]: touched && typeof error === 'string' },
    );

  return (
    <div className={responsiveClass}>
      <div className="field">
        <label
          className="field__label"
          htmlFor={config.name}
        >
          {label}
        </label>
        <div className={containerClass}>

          {preAddOn && <span className="field__addon">{preAddOn}</span>}

          <input
            className="field__input"
            {...input}
            {...config}
          />

          {postAddOn && <span className="field__addon">{postAddOn}</span>}
        </div>

        <p className="field__error">{error}</p>
      </div>
    </div>
  );
};
