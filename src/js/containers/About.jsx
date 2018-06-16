import React from 'react';
import {Link} from 'react-router-dom';

const About = () => {

  return(
    <main className="about-container">

      <section className='side-bar'>
        <img src="/assets/img/profile-pic.jpg" alt="Gert-Jan Wille"/>
        <h1>Gert-Jan Wille</h1>
        <h2>Designer/Developer</h2>
        <h3>gert-janwille.com</h3>

        <Link to={`/contact`}>Hire now</Link>

        <article className="feature-socials">
          <a href="https://behance.net/gert-janwille" rel="noopener noreferrer" target="_blank" className="social">
            <div className="social-icon behance"><span className="hidden">Behance</span></div>
            <p><span className="prefix">behance.net/</span>gert-janwille</p>
          </a>

          <a href="https://github.com/gert-janwille" rel="noopener noreferrer" target="_blank" className="social">
            <div className="social-icon github"><span className="hidden">Github</span></div>
            <p><span className="prefix">github.com/</span>gert-janwille</p>
          </a>
        </article>

        <article className="all-socials">
          <a href="mailto:hello@gert-janwille.com"><span className="small-icon mail"></span>hello@gert-janwille.com</a>
          <a href="https://linkedin.com/in/gert-janwille" rel="noopener noreferrer" target="_blank"><span className="small-icon linkedin"></span>linkedin.com/in/gert-janwille</a>
          <a href="https://twitter.com/gertjanwille" rel="noopener noreferrer" target="_blank"><span className="small-icon twitter"></span>twitter.com/gertjanwille</a>
          <a href="https://instagram.com/gertjanwille" rel="noopener noreferrer" target="_blank"><span className="small-icon instagram"></span>instagram.com/gertjanwille</a>
        </article>

      </section>

      <section></section>

      <section></section>

    </main>
  )
}

export default About;
