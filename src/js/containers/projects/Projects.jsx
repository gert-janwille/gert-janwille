import React from 'react';

import {ProjectFilter, ProjectItem, MainSlide} from '../../components/';

const Home = () => {
  const data = [{}, {}, {}, {}, {}];

  return(
    <main className='home-container'>

      <MainSlide />

      <section className="projects">
        <ProjectFilter />

        <article className="projects-container">
          {data.map((d, id) => <ProjectItem key={id} id={id} {...d}/>)}
        </article>

      </section>

    </main>
  );
}

export default Home;
