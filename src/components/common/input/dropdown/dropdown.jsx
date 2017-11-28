import React from 'react';
import classNames from 'classnames';

export default (props) => {
  const {
    meta: { touched, error },
    input,
    responsiveClass,
    label,
    defaultVal,
    name,
  } = props;

  let element;
  const inputClass = //`field__input ${input.value || 'field__input--unselected'}`;
  classNames(
    element = 'field__input',
    { [`${element}--unselected`]: !input.value },
  );
  const containerClass =
    classNames(
      element = 'field__container',
      { [`${element}--error`]: touched && error },
    );

  return (
    <div className={responsiveClass}>
      <div className="field">
        <label htmlFor={name} className="field__label">{props.label}</label>
        <div className={containerClass} >
          <select className={inputClass} {...input} >
            <option disabled hidden value="">{defaultVal}</option>
            {props.options.map(el => (
              <option key={el.value} value={el.value}>{el.label}</option>
            ))}
          </select>
        </div>

        {touched && error && <p className="field__error">{error}</p>}
      </div>
    </div>
  );
};
