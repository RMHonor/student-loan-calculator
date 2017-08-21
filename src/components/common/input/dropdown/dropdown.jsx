import React from 'react';

export default props => (
  <select>
    <option disabled hidden>{props.default}</option>
    {props.options.map(el => (
      <option key={el.value} value={el.value}>{el.displayValue}</option>
    ))}
  </select>
);
