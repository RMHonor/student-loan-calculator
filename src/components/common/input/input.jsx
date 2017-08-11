import React from 'react';

export default (field) => {
  const { meta: { /*touched, */error }, input, type, responsiveClass } = field;
  return (
    <div className={responsiveClass}>
      <input
        type={type}
        {...input}
      />
      {error}
    </div>
  );
};
