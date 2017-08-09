import React from 'react';


export default (field) => {
  const { meta: { /*touched, */error }, input, type } = field;
  return (
    <div>
      <input
        type={type}
        {...input}
      />
      {error}
    </div>
  );
};
