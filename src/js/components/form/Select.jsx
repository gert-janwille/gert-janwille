import React from 'react';

const RadioOption = ({name, options=[]}) => (
  <div className="select-option">
    <select name={name}>
      {options.map(o => <option key={o} value={o.split(' ').join('-')}>{o}</option>)}
    </select>
  </div>
);

export default RadioOption;
