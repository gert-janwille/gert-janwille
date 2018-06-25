import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import {AboutItem, SkillItem} from '../components/';
import {getbytype} from '../lib/util';

const About = ({skills, experiences}) => {

  return(
    <main className="about-container">

      <section className='side-bar'>
        <div className='main-info'>
          <img src="/assets/img/profile-pic.jpg" alt="Gert-Jan Wille"/>
          <h1>Gert-Jan Wille</h1>
          <h2>Designer/Developer</h2>
          <h3>gert-janwille.com</h3>

          <Link to={`/contact`} className="hire-btn">Hire now</Link>
        </div>

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

      <section className='about-info-container'>
        <article className="experience">

          <div className="info-block">
            <h4>Education</h4>
            {getbytype(experiences, 'edu').map(e => <AboutItem key={e.job} {...e} />)}
          </div>

          <div className="info-block">
            <h4>Work Experience</h4>
            {getbytype(experiences, 'job').map(e => <AboutItem key={e.job} {...e} />)}
          </div>

        </article>

        <article className="skills">
          <div className="info-block">
            <h4>Tech Skills</h4>
            {getbytype(skills, 'tech').map(e => <SkillItem key={e.name} {...e} />)}

            <p className="skill-item little">And More...</p>
          </div>

          <div className="info-block">
            <h4>Design Skills</h4>
            {getbytype(skills, 'design').map(e => <SkillItem key={e.name} {...e} />)}

          </div>

          <div className="info-block">
            <h4>Tools</h4>
            {getbytype(skills, 'tool').map(e => <SkillItem key={e.name} {...e} />)}
          </div>

          <div className="info-block">
            <h4>Miscellaneous</h4>
            {getbytype(skills, 'miscellaneous').map(e => <SkillItem key={e.name} {...e} />)}
          </div>
        </article>

      </section>

    </main>
  )
}

export default inject(
  ({aboutStore}) => ({
    skills: aboutStore.skills,
    experiences: aboutStore.experiences
  })
)(
  observer(About)
);
