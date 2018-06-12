import React from 'react';
import {Link} from 'react-router-dom';

import {splitLines, splitImage} from '../../lib/animate';

const Home = () => {

  return(
    <main>

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

    </main>
  );
}

export default Home;
