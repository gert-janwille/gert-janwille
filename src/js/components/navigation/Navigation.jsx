import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = ({toggle}) => {
  const handleShowMenu = (e) => toggle(e);

  return (
    <nav className='navigation'>
      <Link to={`/`} className="logo" style={{backgroundColor: 'red'}}>
        <h1><span className="hidden">Gert-Jan Wille</span></h1>
      </Link>

      <div className="nav-search">
        <input type="text" className='nav-search-input' name='nav-search' id='nav-search'/>
        <label htmlFor="nav-search" className='nav-search-label'><span className="hidden">Search</span></label>
      </div>

      <a className="menu-icon" onClick={handleShowMenu}><span className="hidden">Menu</span></a>

    </nav>
  );
}

export default Navigation;
