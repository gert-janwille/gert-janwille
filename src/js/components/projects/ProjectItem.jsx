import React from 'react';
import {Link} from 'react-router-dom';

const ProjectItem = ({id}) => {

  return (
    <Link to={`/`} className="project-item">

      <div className="image-holder">

        <img src="/uploads/test-project.png" width="100%" alt="test project"/>
        <p className="views"><span className="eye small-icon"></span>100</p>

      </div>

      <h3 className="project-name">Politicians seek</h3>
      <h4 className="what-done">Branding</h4>

    </Link>
  );
}

export default ProjectItem
