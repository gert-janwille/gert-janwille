import React from 'react';
import {func, bool} from 'prop-types';
import {Route} from 'react-router-dom';

import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {Home} from './';
import {Navigation, Menu} from '../components/'

const App = ({toggleMenu, showMenu}) => (

  <section>

    {process.env.NODE_ENV === `production` ? <DevTools/> : null}

    <Navigation toggle={toggleMenu}  />
    {showMenu ? <Menu toggle={toggleMenu} /> : null}

    <section className='content-container'>
      <Route exact path='/' component={Home} />
    </section>

  </section>

);

App.propTypes = {
  toggleMenu: func.isRequired,
  showMenu: bool.isRequired
};

export default inject(
  ({store}) => ({
    toggleMenu: store.toggleMenu,
    showMenu: store.showMenu
  })
)(
  observer(App)
);
