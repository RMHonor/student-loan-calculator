import React from 'react';

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

        {preAddOn && <span className="field__addon">{preAddOn}</span>}

        <input
          className={inputClass}
          {...input}
          {...config}
          onFocus={evt => evt.target.select()}
        />

        {postAddOn && <span className="field__addon">{postAddOn}</span>}
      </div>

      <p className="field__error">{error}</p>
    </div>
  );
};
