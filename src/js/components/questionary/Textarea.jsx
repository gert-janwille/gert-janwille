import React from 'react';

const Textarea = ({question, subtitle, name}) =>(
  <div className="input-box">
    <label className='q-title' htmlFor={name}>{question}</label>
    <p className='q-sub'>{subtitle}</p>
    <textarea name={question} id={name} placeholder="Type here your text"></textarea>
    <div className="divider"></div>
  </div>
);

export default Textarea;
