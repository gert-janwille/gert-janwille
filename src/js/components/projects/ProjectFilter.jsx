import React from 'react';

import {Radio, Select} from '../form/';

const ProjectFilter = () => {
  const options = ['New first', 'Latest First'];

  return(
    <form className="filter-bar">
      <ul className="option">

        <Radio value="All" name="option" checked={true}/>
        <Radio value="web" name="option"/>
        <Radio value="experiential" name="option"/>
        <Radio value="branding" name="option"/>

      </ul>

      <Select id='choose' name='choose' options={options}/>

    </form>
  );
}

export default ProjectFilter
