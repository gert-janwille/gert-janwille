import React from 'react';
import {Link} from 'react-router-dom';
import {splitLines} from '../../lib/animate';


const MainSlide = () => {

  return(
    <section className="intro">
      <div className="image">
        <img src="/uploads/test-header.png" width="100%" preserveAspectRatio="xMidYMid slice" alt="main-img"/>
        {/* splitImage('/uploads/test-header.png', 15, 'main-img') */}
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
  );
}

export default MainSlide;
