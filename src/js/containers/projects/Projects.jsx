import React from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {ProjectFilter, ProjectItem, MainSlide} from '../../components/';

const Home = ({projects, mainSlide}) => {

  return(
    <main className='home-container'>

      {!isEmpty(mainSlide) ? <MainSlide {...mainSlide}/> : null}

      <section className="projects">
        <ProjectFilter />

        <article className="projects-container">
          {projects.map((d, id) => <ProjectItem key={id} id={id} {...d}/>)}
        </article>

      </section>

    </main>
  );
}

export default inject(
  ({projectStore}) => ({
    projects: projectStore.projects,
    mainSlide: projectStore.mainSlide
  })
)(
  observer(Home)
);
