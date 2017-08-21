import React from 'react';

export default (props) => {
  const {
    // meta: { touched, error },
    input,
    responsiveClass,
    label,
    ...config
  } = props;
  return (
    <div className={responsiveClass}>
      <div className="field">
        <label htmlFor={config.name} className="field__label">{props.label}</label>
        <div className="field__container">
          <select className="field__input" {...input}>
            <option disabled hidden>{props.default}</option>
            {props.options.map(el => (
              <option key={el.value} value={el.value}>{el.displayValue}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
