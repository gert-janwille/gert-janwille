import React from 'react';
import Indicator from './indicator';

const SkillItem = ({name, skill}) => (
  <p className="skill-item">
    {name}
    <Indicator skill={skill}/>
  </p>
);

export default SkillItem;
