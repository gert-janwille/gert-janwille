import React from 'react';
import {Link} from 'react-router-dom';

import menuItems from '../../../assets/data/routes.json';


const Footer = () => (

  <footer>

    <div className="footer-logo"><span className="hidden">GWille</span></div>

    <ul className="pages">
      {menuItems.map(({name, path}) => <li key={name}><Link className='link' to={path}>{name}</Link></li>)}
      <li><Link className='link' to={`/privacy-policy`}>Privacy Policy</Link></li>
    </ul>

    <div className="social">
      <a className="social-icon github" href="https://github.com/gert-janwille" rel='noopener noreferrer' target='_blank'><span className="hidden">Github</span></a>
      <a className="social-icon behance" href="https://www.behance.net/gert-janwille" rel='noopener noreferrer' target='_blank'><span className="hidden">Behance</span></a>
      <a className="social-icon instagram" href="https://www.instagram.com/gwille.agency/" rel='noopener noreferrer' target='_blank'><span className="hidden">Instagram</span></a>
      <a className="social-icon linkedin" href="https://be.linkedin.com/in/gert-janwille" rel='noopener noreferrer' target='_blank'><span className="hidden">Linkedin</span></a>
    </div>

  </footer>
);

export default Footer;
