import React from 'react';

import './button.scss';

export default props => (
  <div className="button__container margin--top--20">
    <button onClick={props.handleSubmit} className="button">{props.label}</button>
  </div>
);
