import React from 'react';

const AboutItem = ({date, job, company, current=false}) => {

  const renderClass = () => {
    if(isNaN(Date.parse(date.split('-')[1]))) return 'current';
    return Date.parse(date.split('-')[1]) - Date.now() > 0 ? `current` : null;
  }

  return(
    <div className="about-item">
      <div className={`dot ${renderClass()}`}></div>
      <p className="date">{date}</p>
      <p className="title">{job}</p>
      <p className="company">{company}</p>
    </div>
  );
}

export default AboutItem;
