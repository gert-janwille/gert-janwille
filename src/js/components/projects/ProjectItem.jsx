import React from 'react';
import {Link} from 'react-router-dom';
import {createValidString} from '../../lib/util';

const ProjectItem = ({title, services, mainImage, color}) => {

  return (
    <Link to={`/projects/${createValidString(title)}`} className="project-item" style={{background: `linear-gradient(${color[0]}, ${color[1]})`}}>
      <img src={`/uploads/${createValidString(title)}/${mainImage}`} onError={({currentTarget}) => currentTarget.src = '/assets/img/default/main-image.png'}  width="100%" alt={title}/>

      <div className="blur-overlay">
        <h3 className="project-name">{title}</h3>
        <h4 className="what-done">{services.join(' | ')}</h4>
      </div>

    </Link>
  );
}

export default ProjectItem
