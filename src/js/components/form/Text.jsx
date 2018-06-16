import React from 'react';

const Text = ({label, value, onChange={}, required=false}) => (
  <div className="floating-label">
    {required ? <div className="required">*</div> : null}
    <input placeholder={label} type="text" name={value} id={value} autoComplete="off" onChange={onChange}/>
    <label htmlFor={value}>{`${label}:`}</label>
  </div>
);

export default Text;
