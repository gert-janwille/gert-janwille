import React from 'react';
import {func} from 'prop-types';
import {Link} from 'react-router-dom';

const Menu = ({toggle}) => {

  const menuItems = [
    {name: 'portfolio', path: '/'},
    {name: 'about', path: '/about'},
    {name: 'contact', path: '/contact'},
    {name: 'hack', path: '/hack'},
  ];

  const handleShowMenu = e => toggle(e);
  const isEven = n => n === parseFloat(n)? !(n%2) : void 0;
  const isActive = n => window.location.pathname === n ? true : false;

  return(
    <section className="menu-container" onClick={handleShowMenu}>

      <ul className="links">
        {menuItems.map((item, id) =>
          <li key={item.name}>
            <Link to={item.path} className={`link ${isActive(item.path) ? `active-link` : ``}`}>
              {isEven(id) ? <span className="bar"></span> : item.name}
              {isEven(id) ? item.name : <span className="bar"></span>}
            </Link>
          </li>
        )}
      </ul>

    </section>
  );
}

Menu.propTypes = {
  toggle: func.isRequired
};

export default Menu;
