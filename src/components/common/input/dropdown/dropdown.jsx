import React from 'react';

export default (props) => {
  const {
    // meta: { touched, error },
    input,
    responsiveClass,
    label,
    defaultVal,
    ...config
  } = props;

  const inputClass = `field__input ${input.value || 'field__input--unselected'}`;
  return (
    <div className={responsiveClass}>
      <div className="field">
        <label htmlFor={config.name} className="field__label">{props.label}</label>
        <div className="field__container">
          <select className={inputClass} {...input} >
            <option disabled hidden value="">{defaultVal}</option>
            {props.options.map(el => (
              <option key={el.value} value={el.value}>{el.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
