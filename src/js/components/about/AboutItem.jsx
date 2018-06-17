import React from 'react';

const AboutItem = ({date, job, company, current=false}) => (
  <div className="about-item">
    <div className={`dot ${current ? `current` : null}`}></div>
    <p className="date">{date}</p>
    <p className="title">{job}</p>
    <p className="company">{company}</p>
  </div>
);

export default AboutItem;
