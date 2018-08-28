import React from 'react';

const None = ({question, subtitle, name}) =>(
  <div className="input-box">
    <label className='q-title' htmlFor={name}>{question}</label>
    <p className='q-sub'>{subtitle}</p>
    <div className="divider"></div>
  </div>
);

export default None;
