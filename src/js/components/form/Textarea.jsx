import React from 'react';

const Textarea = ({label, value, onChange, required=false}) => (
  <div className="floating-label">
    {required ? <div className="required">*</div> : null}
    <textarea placeholder={label} type="text" name={value} id={value} autoComplete="off" onChange={onChange}></textarea>
    <label htmlFor={value}>{`${label}:`}</label>
  </div>
);

export default Textarea;
