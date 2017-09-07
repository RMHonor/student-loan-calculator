import React from 'react';

import './button.scss';

export default props => (
  <div className="button__container margin--top--10">
    <button onClick={props.onClick} className="button">{props.label}</button>
  </div>
);
