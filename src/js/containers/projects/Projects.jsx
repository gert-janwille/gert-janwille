import React from 'react';
import {Link} from 'react-router-dom';

import {ProjectFilter, ProjectItem} from '../../components/';
import {splitLines, splitImage} from '../../lib/animate';

const Home = () => {
  const data = [{}, {}, {}, {}, {}];

  return(
    <main className='home-container'>

      <section className="intro">
        <div className="image">
          {splitImage('/uploads/test-header.png', 8, 'main-img')}
        </div>

        <article className="main-info">
          <h2 className="heading">{splitLines(`Universal Music Group and Brands`, `line-split`)}</h2>
            <p className="caption">The #1 Music and Media Agency</p>

            <Link className='button' to={`/projects/universal-music-group-and-brands`}>
              This is how it’s made
              <span className="btn-line"></span>
            </Link>
        </article>

      </section>

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
