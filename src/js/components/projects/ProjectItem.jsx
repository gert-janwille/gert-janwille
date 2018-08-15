import React from 'react';
import {Link} from 'react-router-dom';
import {createValidString} from '../../lib/util';

const ProjectItem = ({id, title, services, mainImage}) => {

  return (
    <Link to={`/projects/${createValidString(title)}`} className="project-item">

      <div className="image-holder">

        <img src={`/uploads/${createValidString(title)}/${mainImage}`} width="100%" alt={title}/>
        {/* <p className="views"><span className="eye small-icon"></span>100</p> */}

      </div>

      <h3 className="project-name">{title}</h3>
      <h4 className="what-done">{services.join(' | ')}</h4>

    </Link>
  );
}

export default ProjectItem
