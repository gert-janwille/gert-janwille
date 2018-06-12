import React from 'react';
import {func} from 'prop-types';
import {Link} from 'react-router-dom';

import {isEven, isPathName} from '../../lib/util';
import menuItems from '../../../assets/data/routes.json';

const Menu = ({toggle}) => {

  const handleShowMenu = e => toggle(e);

  return(
    <section className="menu-container" onClick={handleShowMenu}>

      <ul className="links">
        {menuItems.map((item, id) =>
          <li key={item.name}>
            <Link to={item.path} className={`link ${isPathName(item.path) ? `active-link` : ``}`}>
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
