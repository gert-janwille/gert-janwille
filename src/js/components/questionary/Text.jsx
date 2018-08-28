import React from 'react';

const Text = ({question, subtitle, name}) =>(
  <div className="input-box">
    <label className='q-title' htmlFor={name}>{question}</label>
    <p className='q-sub'>{subtitle}</p>
    <input type="text" name={question} id={name} placeholder="Type here your text"/>
    <div className="divider"></div>
  </div>
);

export default Text;
