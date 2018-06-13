import React from 'react';

const RadioOption = ({value, name, checked}) => (
  <div className='radio-option'>
    <input id={value} type="radio" name={name} defaultChecked={checked} />
    <label htmlFor={value}>{value}</label>
  </div>
);

export default RadioOption;
