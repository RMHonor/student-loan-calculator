import React from 'react';

import './button.scss';

export default props => (
  <div className="button__container">
    <button className="button">{props.label}</button>
  </div>
);
