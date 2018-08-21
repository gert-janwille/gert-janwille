import React from 'react';
import {Link} from 'react-router-dom';

import {splitLines} from '../../lib/animate';
import {createValidString} from '../../lib/util';


const MainSlide = ({title, subtitle, mainImage, color}) => {

  if (!title) return( <section className='intro'></section>);

  return(
    <section className='intro' style={{background: `linear-gradient(${color[0]}, ${color[1]})`}}>
      <div className="image">
        <img src={`/uploads/${createValidString(title)}/${mainImage}`} onError={({currentTarget}) => currentTarget.src = '/assets/img/default/main-image.png'} width="100%" preserveAspectRatio="xMidYMid slice" alt={title}/>
        {/* splitImage('/uploads/test-header.png', 15, 'main-img') */}
      </div>

      <article className="main-info">
        <h2 className="heading">{splitLines(`${title}`, `line-split`)}</h2>
          <p className="caption">{subtitle}</p>

          <Link className='button' to={`/projects/${createValidString(title)}`}>
            This is how it’s made
            <span className="btn-line"></span>
          </Link>
      </article>

    </section>
  );
}

export default MainSlide;
