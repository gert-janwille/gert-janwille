import React from 'react';
import {inject, observer} from 'mobx-react';

import {Radio} from '../form/';

const ProjectFilter = ({tags, filter}) => {

  const handleChangeItems = e => filter(e.target.id);

  return(
    <form className="filter-bar">
      <ul className="option">

        <li><Radio value="All" name="option" checked={true} onClick={handleChangeItems}/></li>
        {tags.map(t => <li key={t}><Radio value={t} name="option" onClick={handleChangeItems}/></li>)}

      </ul>
    </form>
  );
}

export default inject(
  ({projectStore}) => ({
    tags: projectStore.tags,
    filter: projectStore.filter
  })
)(
  observer(ProjectFilter)
);
