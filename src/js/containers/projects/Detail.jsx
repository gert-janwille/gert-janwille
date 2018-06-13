import React from 'react';
import {Link} from 'react-router-dom';
import {MainSlide} from '../../components/';

const Detail = ({match}) => {
  const {title} = match.params;
  console.log(title);

  return(
    <section className='home-container detail-container'>
      <MainSlide />

      <article className="main-info-block block">
        <div className="text">

          <ul className="services">
            <li className="headline">Our Services</li>

            <li className="service-item">Interaction Design</li>
            <li className="service-item">Front-End Development</li>
            <li className="service-item">Serious gaming</li>
          </ul>

          <p>
            <span className="headline hard">About the project </span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          </p>

        </div>

        <div className="image">
          <img src="/uploads/test-detail-long.jpg" alt="work1" width="70%" />
          <img src="/uploads/test-detail-short.jpg" alt="work2" width="30%" />
        </div>

      </article>

      <article className="text-info-block block">
        <p>
          <span className="headline">About the project - </span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        </p>
      </article>

      <article className="image-info-block block">
        <div className="image-holder">
          <img src="/uploads/test-detail-feature.jpg" alt="feature"/>
        </div>
      </article>

      <article className="hire-me block">
        <p className="thanks">Thanks, Want something like this?</p>
        <p>We collaborate  with ambitious brands and people; we’d love to build something great together.</p>
        <Link className='button' to={`/contact`}>
          Contact me
          <span className="btn-line"></span>
        </Link>
      </article>

      <article className="other-projects block">
        <p className="other-project-link">Project Number One</p>
        <p className="other-project-link">Project Two</p>
        <p className="other-project-link">Project N°Three</p>
      </article>
    </section>
  );
}

export default Detail
