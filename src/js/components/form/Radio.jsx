import React from 'react';

const RadioOption = ({value, name, checked, onClick}) => (
  <div className='radio-option'>
    <input id={value} type="radio" name={name} onClick={onClick} defaultChecked={checked} />
    <label htmlFor={value}>{value}</label>
  </div>
);

export default RadioOption;
